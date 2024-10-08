import { mapMetaData } from './mapMetaData';

export const mapEmployee = (employee: any) => {
    return {
        active: employee.active,
        email: employee.email,
        id: employee.id,
        jobTitle: employee.jobTitle,
        level: employee.level,
        managerId:  employee.managerId || employee.manager||null,
        name: employee.name,
        role: employee.role,
        ...mapMetaData(employee),
    };
};
