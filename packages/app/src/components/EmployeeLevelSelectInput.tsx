import {SelectInput, useGetList} from 'react-admin';
import React from 'react';
import {formatLevels} from '../lib/formatLevels';

export const EmployeeLevelSelectInput = () => {
    const {data} = useGetList('employeeLevel');
    const formattedLevels = formatLevels(data);

    return (
            <SelectInput
            source='employeeLevel'
            choices={formattedLevels || []}
    />
    )
}
