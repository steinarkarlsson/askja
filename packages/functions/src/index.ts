import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { info, warn } from 'firebase-functions/logger';
import { region } from 'firebase-functions';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getReviewPeriod} from './lib/getReviewPeriod';
import { getTemplate } from './lib/getTemplate';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onCall } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import { employeeSchema } from '@performus/common/schemas/Employee';
import {reviewSchema} from '@performus/common/schemas/Review';
import { templateSchema} from '@performus/common/schemas/Template';
import { Competency } from '@performus/common/schemas/Competency';
import { HttpsError } from 'firebase-functions/v2/identity';

initializeApp()

const functions = region('australia-southeast1');
setGlobalOptions({ region: 'australia-southeast1' });

const db = getFirestore();
export const createReviews = onSchedule(
    {
        schedule: 'every day 03:00',
        timeoutSeconds: 1800,
    },
    async () => {
        const db = getFirestore();
        const reviewPeriodSnapshot = await db.collection('reviewPeriod').get();
        const reviewPeriod = getReviewPeriod(reviewPeriodSnapshot, 'startDate');

        if (!reviewPeriod) {
            info('No review period starting today');
            return;
        }

        console.log(`Review Period starting today: ${reviewPeriod.data().title}`);

        const templateSnapshot = await db.collection('template').where('active', '==', true).get();
        const employeeSnapshot = await db.collection('employee').where('active', '==', true).get();
        const employeeLevelSnapshot = await db.collection('employeeLevel').get();

        const reviews = employeeSnapshot.docs.map((employeeDoc) => {
            const employee = employeeSchema.parse(employeeDoc.data());
            const coreTemplate = getTemplate({
                employee: employee,
                templates: templateSnapshot,
                type: 'Core',
            });
            const functionalTemplate = getTemplate({
                employee: employee,
                templates: templateSnapshot,
                type: 'Functional',
            });

            if (!coreTemplate || !functionalTemplate) {
                warn(`Template not found for ${employee.name} - ${employee.jobTitle} - ${employee.employeeLevel}\n    - Core template: ${coreTemplate?.jobTitle}`);
            }

            const competencies: Competency[] = [...(coreTemplate?.competencies || []), ...(functionalTemplate?.competencies || [])]
                .map((competency) => {
                    return {
                        ...competency,
                        source: 'template',
                    };
                });
            const template = {
                coreTemplateId: coreTemplate?.id,
                functionalTemplateId: functionalTemplate?.id,
                competencies: competencies,
            };

            if (functionalTemplate && coreTemplate) {

                const employeeLevel = employeeLevelSnapshot.docs.find(doc => doc.id === employee.employeeLevel);
                const initialStatus = employeeLevel && employeeLevel.data().selfReview ? 'Pending Employee' : 'Completed';
                return reviewSchema.parse({
                    id: '',
                    competencies: template.competencies,
                    employeeName: employee.name,
                    manager: employee.manager,
                    status: initialStatus,
                    jobTitle: employee.jobTitle,
                    employeeLevel: employee.employeeLevel,
                    reviewPeriodId: reviewPeriod.id,
                    reviewPeriodName: reviewPeriod.data().title,
                    reviewType: reviewPeriod.data().type,
                    employeeId: employee.id,
                    coreTemplateId: template.coreTemplateId,
                    functionalTemplateId: template.functionalTemplateId,
                });
            } else {
                warn(
                    `Template not found for ${employee.name} - ${employee.jobTitle} - ${employee.employeeLevel}\n    - Core template: ${coreTemplate?.jobTitle} - ${
                        coreTemplate?.level
                    }\n    - Functional template: ${functionalTemplate?.jobTitle} - ${functionalTemplate?.level}`,
                );
                return;
            }
        });

        reviews.forEach(async (review) => {
            if (review) {
                const docRef = db.collection('review').doc();
                review.id = docRef.id;
                await docRef.set(review);
            }
        });
        info(`Created ${reviews.length} reviews for ${reviewPeriod.data().title}`);
    },
);

export const closeReviews = onSchedule(
    {
        schedule: 'every day 23:00',
        timeoutSeconds: 1800,
    },
    async () => {
        const db = getFirestore();
        const reviewPeriodSnapshot = await db.collection('reviewPeriod').get();
        const reviewPeriodDoc = getReviewPeriod(reviewPeriodSnapshot, 'endDate');

        if (!reviewPeriodDoc) {
            info('No review period ending today');
            return;
        }
        const reviewPeriod = reviewPeriodDoc.data();
        console.log(`Review Period ending today: ${reviewPeriod.title}`);

        const reviewSnapshot = await db.collection('review').where('reviewPeriodId', '==', reviewPeriod.id).get();

        const reviews = reviewSnapshot.docs.map((reviewDoc) => {
            const review = reviewSchema.parse(reviewDoc.data());
            if (review.status === 'Completed') {
                return;
            }
            return {
                ...review,
                status: 'Completed',
            };
        });

        reviews.forEach(async (review) => {
            if (review) {
                await db.collection('review').doc(review.id).update(review);
            }
        });
        info(`Closed ${reviews.length} reviews for ${reviewPeriod.title}`);
    },
);

export const getProfile = onCall(async (request) => {
    const employeeQuery = request.auth?.uid ? await db.collection('employee').where(
        'userId',
        '==',
        request.auth?.uid,
    ).get() : null;
    const employeeSnapshot = employeeQuery?.docs[0];
    return employeeSnapshot?.data() || {};
});

export const onEmployeeUpdated = onDocumentWritten('employee/{docId}', async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!after) {
        return;
    }
    await getAuth()
        .updateUser(after.id, {
            email: after.email,
            displayName: after.name,
        });
    console.log({
        before,
        after,
    });
    await getAuth().setCustomUserClaims(after.id, {
        email: after.email,
        role: after.role,
        employeeId: after.id,
    });
    const updatedUser = await getAuth().getUser(after.id);
    console.log({ updatedUser });
});

export const onTemplateUpdated = onDocumentWritten('template/{docId}', async (event) => {
    info('onTemplateUpdated triggered.');
    const template = templateSchema.parse(event.data?.after.data());
    if (!template) {
        warn('No template found');
        return;
    }

    const reviews = await db.collection('review').where(
        template.type === 'Core' ? 'coreTemplateId' : 'functionalTemplateId', '==', template?.id).get();

    info(`${reviews.docs.length} reviews found for that template`);
    reviews.forEach((reviewDoc)=> info(`Updating review for: ${reviewDoc.data().employeeName} - with new template: ${template.id}`))

    for (const reviewDoc of reviews.docs) {

        const review = reviewSchema.parse(reviewDoc.data());
        const alternateTemplateId = review[template.type === 'Core' ? 'functionalTemplateId' : 'coreTemplateId'];
        const alternateTemplate = templateSchema.parse((await db.collection('template').doc(alternateTemplateId).get()).data());

        const competencies: Competency[] = [];

        if (template.type === 'Core') {
            template.competencies.forEach((compentency) => competencies.push(compentency));
            alternateTemplate.competencies.forEach((compentency) => competencies.push(compentency));
        } else {
            alternateTemplate.competencies.forEach((compentency) => competencies.push(compentency));
            template.competencies.forEach((compentency) => competencies.push(compentency));
        }
        const userCompentencies = review.competencies.filter((compentency) => compentency.source !== 'template');
        userCompentencies.forEach((compentency) => competencies.push(compentency));
        info(competencies);
        await db.collection('review').doc(review.id).update({
            competencies: competencies,
        });
    }
    info('onTemplateUpdated completed.');
});

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
    if (!user.uid) {
        throw new HttpsError('invalid-argument', 'No user id available');
    }


    const employeeSnapshotQuery = await db.collection('employee').where('email', '==', user.email).get();

    if (employeeSnapshotQuery.empty) {
        return;
    }

    const employeeSnapshot = employeeSnapshotQuery.docs[0];
    await db.collection('employee').doc(employeeSnapshot.id).update({
        userId: user.uid,
    });
    await getAuth().setCustomUserClaims(user.uid, {
        role: employeeSnapshot.data().role,
    });

    const updatedEmployee = await db.collection('employee').doc(user.uid).get();
    console.log('onUserCreated updatedEmployee.data:', { updatedEmployee });
    return;
});
