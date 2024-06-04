import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { info, warn } from 'firebase-functions/logger';
import { region } from 'firebase-functions';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getReviewPeriodStartingToday } from './lib/getReviewPeriodStartingToday';
import { getTemplate } from './lib/getTemplate';
import { setGlobalOptions } from 'firebase-functions/v2';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import {employeeSchema} from '@jucy-askja/common/schemas/Employee'

initializeApp();
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

        const templateSnapshot = await db.collection('template').get();
        const employeeSnapshot = await db.collection('employee').where('active', '==', true).get();

        info(`Review Period starting today: ${reviewPeriod.data().title}`);

        const reviews = employeeSnapshot.docs.map((employeeDoc) => {
            const employee =   employeeSchema.parse(employeeDoc.data);
            const coreTemplate = getTemplate({ employee: employee, templates: templateSnapshot, type: 'Core' });
            const functionalTemplate = getTemplate({
                employee: employee,
                templates: templateSnapshot,
                type: 'Functional',
            });

            const template = {
                coreTemplateId: coreTemplate?.id,
                functionalTemplateId: functionalTemplate?.id,
                functionalCompetencies: functionalTemplate?.competencies,
                coreCompetencies: coreTemplate?.competencies,
            };

            if (functionalTemplate && coreTemplate) {
                info(
                    `Found template for ${employee.name} - ${employee.jobTitle} - ${employee.level}:\n    - Core template: ${coreTemplate?.jobTitle} - ${
                        coreTemplate?.level
                    }\n    - Functional template: ${functionalTemplate?.jobTitle} - ${functionalTemplate?.level}`,
                );
                return {
                    employeeId: employee.id,
                    employeeName: employee.name,
                    managerId: employee.managerId,
                    status: 'pending',
                    jobTitle: employee.jobTitle,
                    level: employee.level,
                    reviewPeriodId: reviewPeriod.id,
                    reviewPeriodName: reviewPeriod.data().title,
                    reviewType: reviewPeriod.data().type,
                    coreTemplateId: template.coreTemplateId,
                    functionalTemplateId: template.functionalTemplateId,
                    functionalCompetencies: template.functionalCompetencies,
                    coreCompetencies: template.coreCompetencies,
                };
            } else {
                warn(
                    `Template not found for ${employee.name} - ${employee.jobTitle} - ${employee.level}\n    - Core template: ${coreTemplate?.jobTitle} - ${
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
//
export const getProfile = onCall(async (request) => {
    const employeeSnapshot = request.auth?.uid ? await db.collection('employee').doc(request.auth?.uid).get() : null;

    return employeeSnapshot?.data() || {};
//
//     request.auth.uid
//     const employeeSnapshot = await db.collection('employee').where('active', '==', true).get();
//
//     const isAdmin = false;
//     const employeeId = employeeSnapshot.docs.find((employee: Employee) => employee.email === user.email)?.id;
//     const isManager = employeeSnapshot.docs.some((employee) => employee.managerId === employeeId);
//
//     const customClaims = {
//         admin: isAdmin,
//         manager: isManager,
//         employeeId: employeeId,
//     };
//
//     try {
//         // Set custom user claims on this newly created user.
//         await getAuth().setCustomUserClaims(user.uid, customClaims);
//
//         // Update real-time database to notify client to force refresh.
//         const metadataRef = getDatabase().ref('employee/' + user.uid);
//
//         // Set the refresh time to the current UTC timestamp.
//         // This will be captured on the client to force a token refresh.
//         await metadataRef.set({refreshTime: new Date().getTime()});
//     } catch (error) {
//         console.log(error);
//     }
});
//
// exports.processSignUp = functions.auth.user().onCreate(async (user) => {
//     // Check if user meets role criteria.
//     if (
//         user.email &&
//         user.email.endsWith('@admin.example.com') &&
//         user.emailVerified
//     ) {
//         const customClaims = {
//             admin: true,
//             accessLevel: 9
//         };
//
//         try {
//             // Set custom user claims on this newly created user.
//             await getAuth().setCustomUserClaims(user.uid, customClaims);
//
//             // Update real-time database to notify client to force refresh.
//             const metadataRef = getDatabase().ref('metadata/' + user.uid);
//
//             // Set the refresh time to the current UTC timestamp.
//             // This will be captured on the client to force a token refresh.
//             await  metadataRef.set({refreshTime: new Date().getTime()});
//         } catch (error) {
//             console.log(error);
//         }
//     }
// });
// import { doc, getDoc } from "firebase/firestore";
//
// export const beforecreated = beforeUserCreated(async (event) => {
//     console.log('beforecreated fired')
//     const userId = event.auth?.uid;
//     if (!userId) {
//         throw new HttpsError('invalid-argument', 'No user id available');
//
//     }
//     const employeeSnapshot = await db.collection('employee').doc(userId).get();
//
//     if (!employeeSnapshot.exists) {
//         await db.collection('employee').doc('userId').set({
//             id: userId,
//         });
//     }
//
//     return;
// });

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
    console.log('beforecreated fired');
    if (!user.uid) {
        throw new HttpsError('invalid-argument', 'No user id available');

    }
    const employeeSnapshot = await db.collection('employee').doc(user.uid).get();

    if (!employeeSnapshot.exists) {
        await db.collection('employee').doc(user.uid).set({
            id: user.uid,
            email: user.email,
            name: user.displayName,
            role: user.customClaims?.role || 'employee',
        });
    }

    return;
});

export const onEmplyeeUpdated = onDocumentWritten('employee/{docId}', async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!after) {
        return;
    }
    await getAuth()
        .updateUser(after.id, {
            email: after.email,
        });
    console.log({
        before,
        after,
    });
    await getAuth().setCustomUserClaims(after.id, {
        email: after.email,
        role: after.role,
    });

});
