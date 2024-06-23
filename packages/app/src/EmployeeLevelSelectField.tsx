import {SelectField, useGetList} from 'react-admin';
import React from 'react';
import {formatLevels} from './lib/formatLevels';

export const EmployeeLevelSelectField = (label) => {
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
