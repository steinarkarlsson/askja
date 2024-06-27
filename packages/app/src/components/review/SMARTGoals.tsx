import {Box} from '@mui/material';
import React from 'react';

export const SMARTGoals = () => {
    return (
            <Box sx={{
                border: 1,
                borderRadius: '15px',
                borderColor: 'lightgray',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '20px',
                padding: '20px',
                alignItems: 'center'
            }}>
                <h3>Make sure the goals are SMART:</h3>
                <ul>
                    <li><b>S</b>pecific (simple, sensible, significant).</li>
                    <li><b>M</b>easurable (meaningful, motivating).</li>
                    <li><b>A</b>chievable (agreed, attainable).</li>
                    <li><b>R</b>elevant (reasonable, realistic and resourced, results-based).</li>
                    <li><b>T</b>ime bound (time-based, time limited, time/cost limited, timely, time-sensitive).</li>
                </ul>
            </Box>
    )
}
