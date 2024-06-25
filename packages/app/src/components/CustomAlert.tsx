import {Alert} from '@mui/material';
import React from 'react';
import {RichTextField, useRecordContext} from 'react-admin';

export const CustomAlert = ({ source }: { source: string }) => {
    const record = useRecordContext();
    if (!record) return null;

    return (
            <Alert severity="info" className={source}>
                <RichTextField source={source}/>
            </Alert>
    );
}
