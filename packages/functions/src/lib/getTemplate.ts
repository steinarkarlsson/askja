//@ts-ignore-next-line
import {FirebaseFirestore } from '@firebase/firestore-types';


import { Employee } from '@jucy-askja/common/schemas/Employee';
interface GetTemplateProps {
    employee: Employee;
    templates: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;
    type: string;
}

const sanatizeString = (input: string) => {
    return input?.toLowerCase().trim() || '';
};

const isAnyString = (input: string) => {
    const sanatizedInput = sanatizeString(input);
    return !sanatizedInput || sanatizedInput === 'all';
};

const getScore = ({
    typeMatches,
    levelMatches,
    jobTitleMatches,
    anyJobTitle,
    anyLevel,
}: {
    typeMatches: boolean;
    levelMatches: boolean;
    jobTitleMatches: boolean;
    anyJobTitle: boolean;
    anyLevel: boolean;
}) => {
    if (!typeMatches) {
        return 0;
    }
    if (jobTitleMatches && levelMatches) {
        return 4;
    } else if (jobTitleMatches && anyLevel) {
        return 3;
    } else if (anyJobTitle && levelMatches) {
        return 2;
    } else if (anyJobTitle && anyLevel) {
        return 1;
    }
    return 0;
};

export const getTemplate = ({ employee, templates, type }: GetTemplateProps) => {
    const templateGrades = templates.docs.map((templateDoc) => {
        const template = templateDoc.data();
        //Logic for selecting a review template:
        // Start by only selecting templates that have the matching type (Core or Functional)
        // Then check if any templates match the employee level (Support, Professional, etc)
        // Then check if any templates match the employee jobTitle (Detailer, Customer Service Rep, etc)
        // If no template is found that matches the employee jobTitle or level, return the first template that applies all jobTitles
        const templateJobTitle = sanatizeString(template.jobTitle);
        const employeeJobTitle = sanatizeString(employee.jobTitle);

        // const typeMatches = template.type.toLowerCase() === type.toLowerCase();
        // const levelMatches = template.level === employee.level;
        // const jobTitleMatches = templateJobTitle === employeeJobTitle
        // const anyJobTitle = employeeJobTitle=== 'all' || !employeeJobTitle
        // const anyLevel = template.level === null || template.level.toLowerCase() === 'all' || template.level === '';

        let matchScore = getScore({
            typeMatches: template.type.toLowerCase() === type.toLowerCase(),
            levelMatches: template.level === employee.level,
            jobTitleMatches: templateJobTitle === employeeJobTitle,
            anyJobTitle: isAnyString(employeeJobTitle),
            anyLevel: isAnyString(template.level),
        });
        // if (typeMatches) {
        //     if (jobTitleMatches && levelMatches) {
        //         matchScore = 4
        //     } else if (jobTitleMatches && anyLevel) {
        //         matchScore = 3
        //     } else if (anyJobTitle && levelMatches) {
        //         matchScore = 2
        //     } else if (anyJobTitle && anyLevel) {
        //         matchScore = 1
        //     }
        // }
        return { template, matchScore };
    });

    return templateGrades.reduce((prev, current) => {
        return prev!.matchScore > current!.matchScore ? prev : current;
    })!.template;
};
