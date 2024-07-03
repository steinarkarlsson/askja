import {SelectField, useGetList} from 'react-admin';
import React from 'react';
import {formatLevels} from './lib/formatLevels';

interface EmployeeLevelSelectFieldProps {
    label: string;
}

export const EmployeeLevelSelectField: React.FC<EmployeeLevelSelectFieldProps> = ({label}) => {
    const {data} = useGetList('employeeLevel');
    const formattedLevels = formatLevels(data);
    return (
    <SelectField
            source='employeeLevel'
            choices={formattedLevels || []}
            label={label}
    />
    )
}
