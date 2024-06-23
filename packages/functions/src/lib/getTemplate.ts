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
    anyLevel,
}: {
    typeMatches: boolean;
    levelMatches: boolean;
    anyLevel: boolean;
}) => {
    if (!typeMatches) {
        return 0;
    }
    if ( levelMatches) {
        return 3;
    } else if (anyLevel) {
        return 2;
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

        let matchScore = getScore({
            typeMatches: template.type.toLowerCase() === type.toLowerCase(),
            levelMatches: template.employeeLevel === employee.employeeLevel,
            anyLevel: isAnyString(template.employeeLevel),
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
