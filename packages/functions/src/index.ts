import {initializeApp} from "firebase-admin/app";
import {onSchedule} from "firebase-functions/lib/v2/providers/scheduler";
import {getFirestore} from "firebase-admin/firestore";
import {Review} from "@jucy-askja/common/schemas";

export const createReviews = onSchedule("every day 00:00", async () => {
    initializeApp();

    const db = getFirestore();
    const reviewPeriodSnapshot = await db.collection("reviewPeriod").get();
    reviewPeriodSnapshot.docs.forEach((reviewPeriodDoc) => {
        const reviewPeriodData = reviewPeriodDoc.data();
        console.log(reviewPeriodData);
    });
    const templateSnapshot = await db.collection("template").get();
    console.log(templateSnapshot.docs);
    const employeeSnapshot = await db.collection("employee").get();
    console.log(employeeSnapshot);

    const reviews: typeof Review[] = [];

    employeeSnapshot.docs.forEach((employeeDoc) => {
        const employeeData = employeeDoc.data();
        console.log(employeeData);

        const review: typeof Review = {
            id: "",
            employeeId: employeeDoc.id,
            managerId: employeeDoc.data().managerId,
            level: employeeData.level,
            status: "active",
            jobTitle: employeeData.jobTitle,
            active: true,
        };

        templateSnapshot.docs.forEach((templateDoc) => {
            const templateData = templateDoc.data();
            console.log(templateData);
            // Create a review based on the template and employee data
            if (templateData.jobTitle === employeeData.jobTitle ) {
                review.competencies = templateData.competencies;
            }
        });
        reviews.push(review);
    });

    const batch = db.batch();

    reviews.forEach((review) => {
        const reviewRef = db.collection("review").doc();
        batch.set(reviewRef, review);
    });

    await batch.commit();

    console.log("createReviews completed");
});
