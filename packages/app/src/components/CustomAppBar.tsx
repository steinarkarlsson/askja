import React from 'react';
import {AppBar} from 'react-admin';
import {Typography} from '@mui/material';

export const CustomAppBar = () => (
        <AppBar color="secondary" sx={{alignItems:'center'}}>
            <Typography variant='h3'>Road 2 Excellence</Typography>
        </AppBar>
);
