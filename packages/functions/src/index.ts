import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { info, warn } from 'firebase-functions/logger';
import { region } from 'firebase-functions';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getReviewPeriodStartingToday } from './lib/getReviewPeriodStartingToday';
import { getTemplate } from './lib/getTemplate';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onCall } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import { employeeSchema } from '@jucy-askja/common/schemas/Employee';
import { Competency } from '@jucy-askja/common/schemas/Competency';
import { Review } from '@jucy-askja/common/schemas/Review';
import { beforeUserCreated, HttpsError } from 'firebase-functions/v2/identity';

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
        const reviewPeriod = getReviewPeriodStartingToday(reviewPeriodSnapshot);

        if (!reviewPeriod) {
            info('No review period starting today');
            return;
        }

        console.log(`Review Period starting today: ${reviewPeriod.data().title}`);

        const templateSnapshot = await db.collection('template').where('active','==',true).get();
        const employeeSnapshot = await db.collection('employee').where('active', '==', true).get();

        const reviews = employeeSnapshot.docs.map((employeeDoc): Review[] | undefined => {
            // console.log('mapping employeeDoc:', employeeDoc.data());
            const employee = employeeSchema.parse(employeeDoc.data());
            const coreTemplate = getTemplate({
                employee: employee,
                templates: templateSnapshot,
                type: 'Core'
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
                // info(
                //     `Found template for ${employee.name} - ${employee.jobTitle} - ${employee.employeeLevel}:\n    - Core template: ${coreTemplate?.jobTitle} - ${
                //         coreTemplate?.level
                //     }\n    - Functional template: ${functionalTemplate?.jobTitle} - ${functionalTemplate?.level}`,
                // );
                return {
                    competencies:template.competencies,
                    employeeName: employee.name,
                    manager: employee.manager,
                    status: 'Pending Employee',
                    jobTitle: employee.jobTitle,
                    employeeLevel: employee.employeeLevel,
                    reviewPeriodId: reviewPeriod.id,
                    reviewPeriodName: reviewPeriod.data().title,
                    reviewType: reviewPeriod.data().type,
                    employeeId: employee.id,
                    coreTemplateId: template.coreTemplateId,
                    functionalTemplateId: template.functionalTemplateId,
                };
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
                await db.collection('review').add(review);
            }
        });
        info(`Created ${reviews.length} reviews for ${reviewPeriod.data().title}`);
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

export const beforecreated = beforeUserCreated(async (event) => {
    if (!event.data.uid) {
        throw new HttpsError('invalid-argument', 'No user id available');
    }

    const employeeSnapshotQuery = await db.collection('employee').where('email', '==', event.data.email).get();

    if (employeeSnapshotQuery.empty) {
        throw new HttpsError('invalid-argument', 'No employee found with that email');
    }
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
