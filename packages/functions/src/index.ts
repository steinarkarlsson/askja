import {initializeApp} from "firebase-admin/app";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {getFirestore} from "firebase-admin/firestore";
import {getReviewPeriodStartingToday} from "./lib/getReviewPeriodStartingToday";
import {getTemplate} from "./lib/getTemplate";

initializeApp();

export const createReviews = onSchedule("every day 03:00", async () => {

    const db = getFirestore();
    const reviewPeriodSnapshot = await db.collection("reviewPeriod").get();
    const templateSnapshot = await db.collection("template").get();
    const employeeSnapshot = await db.collection("employee").where("active", "==", true).get();

    const reviewPeriod = getReviewPeriodStartingToday(reviewPeriodSnapshot);
    reviewPeriod ? console.log(`Review Period starting today: ${reviewPeriod.data().title}`) : console.log(`No review period starting today`);

    if (!reviewPeriod) {
        return;
    }
    const reviews = employeeSnapshot.docs.map((employee) => {

        const coreTemplate = getTemplate({employeeDoc: employee, templates: templateSnapshot, type: 'Core'});
        const functionalTemplate = getTemplate({
            employeeDoc: employee,
            templates: templateSnapshot,
            type: 'Functional'
        });

        const template = {
            coreTemplateId: coreTemplate?.id,
            functionalTemplateId: functionalTemplate?.id,
            functionalCompetencies: functionalTemplate?.competencies,
            coreCompetencies: coreTemplate?.competencies
        };

        const templateFound = !!(functionalTemplate || coreTemplate);

        templateFound && console.log(`Matched template for ${employee.data().name} - ${employee.data().jobTitle}: \n    - Functional template: ${functionalTemplate?.jobTitle} - ${functionalTemplate?.level} \n    - Core template: ${coreTemplate?.jobTitle} - ${coreTemplate?.level}`)
        //templateFound && console.log(JSON.stringify(template, null, 2));

        if (functionalTemplate) {
            return {
                employeeId: employee.id,
                employeeName: employee.data().name,
                managerId: employee.data().manager,
                status: "pending",
                jobTitle: employee.data().jobTitle,
                level: employee.data().level,
                reviewPeriodId: reviewPeriod.id,
                reviewPeriodName: reviewPeriod.data().title,
                reviewType: reviewPeriod.data().type,
                coreTemplateId: template.coreTemplateId,
                functionalTemplateId: template.functionalTemplateId,
                functionalCompetencies: template.functionalCompetencies,
                coreCompetencies: template.coreCompetencies,
            }
        } else {
            console.log(`No template found for ${employee.data().name} - ${employee.data().jobTitle}`);
            return
        }
    });
    console.log('Reviews to be created in Firestore:');
    console.log(JSON.stringify(reviews, null, 2));

    reviews.forEach(async (review) => {
        if (review) {
            await db.collection('review').add(review);
        }
    })
});
