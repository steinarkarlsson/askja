import { mapCompetency } from './mapCompetency';
import { mapMetaData } from './mapMetaData';

export const mapTemplate = (template: any) => {
    const mapType = (type?: string) => {
        switch (type?.toLowerCase()) {
            case 'core':
                return 'Core';
            case 'supporting':
                return 'Supporting';
            case 'leadership':
                return 'Leadership';
            case 'functional':
                return 'Functional';
            default:
                return 'Core';
        }
    };
    return {
        id: template.id,
        level: template.level,
        jobTitle: template.jobTitle || '',
        type: mapType(template.type),
        competencies: template.competencies?.map(mapCompetency),
        active: template.active,
        ...mapMetaData(template),
    };
};
