import { competencyCategorySchema } from '../../common/schemas/CompetencyCategory';

export const mapCompetency = (competency: any) => {
    const mapCompetencyType = (type?: string) => {
        switch (type?.toLowerCase()) {
            case 'core':
                return 'Core';
            case 'functional':
                return 'Functional';
            default:
                return 'Core';
        }
    };

    const mapCategory = (category?: string) => {
        const result = competencyCategorySchema.safeParse(category);
        if (result.success) {
            return result.data;
        }
        return '';
    };
    return {
        title: competency.title || competency.Title || '',
        category: mapCategory(competency.category || competency.Category || ''),
        competencyType: mapCompetencyType(competency.competencyType),
        description: competency.description || competency.Description || '',
        managerComment: competency.managerComment || competency.ManagerComment  || undefined,
        hrComment: competency.hrComment || competency.HrComment  || undefined,
        managerApproved: competency.managerApproved || competency.ManagerApproved || undefined,
        hrApproved: competency.hrApproved || competency.HrApproved  || undefined,
        template: competency.template,
        source: competency.source,
    };
};
