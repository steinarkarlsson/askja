interface GetTemplateProps {
    employeeDoc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
    templates: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
    type: string
}

export const getTemplate = ({employeeDoc, templates, type}: GetTemplateProps) => {
        const templateGrades = templates.docs.map(templateDoc => {

            const template = templateDoc.data();
            const employee = employeeDoc.data();
            //Logic for selecting a review template:
            // Start by only selecting templates that have the matching type (Core or Functional)
            // Then check if any templates match the employee level (Support, Professional, etc)
            // Then check if any templates match the employee jobTitle (Detailer, Customer Service Rep, etc)
            // If no template is found that matches the employee jobTitle or level, return the first template that applies all jobTitles

            const typeMatches = template.type.toLowerCase() === type.toLowerCase();
            const levelMatches = template.level === employee.level;
            const jobTitleMatches = template.jobTitle === employee.jobTitle;
            const anyJobTitle = template.jobTitle === null || template.jobTitle.toLowerCase() === 'all' || template.jobTitle === '';
            const anyLevel = template.level === null || template.level.toLowerCase() === 'all' || template.level === '';

            let matchScore = 0;
            if (typeMatches) {
                if (jobTitleMatches && levelMatches) {
                    matchScore = 4
                } else if (jobTitleMatches && anyLevel) {
                    matchScore = 3
                } else if (anyJobTitle && levelMatches) {
                    matchScore = 2
                } else if (anyJobTitle && anyLevel) {
                    matchScore = 1
                }
            }
            return {template, matchScore}
        })

        const bestMatch = templateGrades.reduce((prev, current) => {
            return (prev!.matchScore > current!.matchScore) ? prev : current
        })!.template;

        console.log(`best template match for ${type}:`)
        console.log(bestMatch)
        return bestMatch;
}