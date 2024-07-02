import React from 'react';
import {Link, UserMenu} from 'react-admin';
import {Box, Typography} from '@mui/material';
import {palette} from '../../themes/customTheme';

export const CustomAppBar = () => {
    return (
            <Box sx={{
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'secondary',
                alignContent: 'center',
                marginTop: '-50px',
                paddingX: '10px',
            }}>
                <Link to={'/'}>
                    <Typography variant='h3' color={palette.text.primary}>
                        Road2Excellence
                    </Typography>
                </Link>
                <UserMenu/>
            </Box>
    )
};
