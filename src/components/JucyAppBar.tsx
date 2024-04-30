import * as React from 'react';
import {Box, CssBaseline, Typography} from "@mui/material";
import logo from '../logo.svg';
export const JucyAppBar = () => {
    return (
        <>
            <CssBaseline />
            <Box sx={{ textAlign:'center', paddingBottom:'30px'}}>
                        <img src={logo} alt='Logo' width='200'/>
                        <Typography variant="h4" component="div">
                            Performance
                        </Typography>
            </Box>
        </>
    );
}