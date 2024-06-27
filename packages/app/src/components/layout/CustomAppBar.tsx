import React from 'react';
import {AppBar} from 'react-admin';
import {Typography} from '@mui/material';

export const CustomAppBar = () => {
    return (
            <AppBar color="secondary" userMenu={true} sx={{
                '& .MuiToolbar-root': {
                    justifyItems: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
                }
            }}>
                <Typography variant='h4'>
                    Road2Excellence
                </Typography>
            </AppBar>
    )
};
