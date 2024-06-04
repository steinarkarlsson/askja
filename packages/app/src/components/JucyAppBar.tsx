import logo from '../logo.svg';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { AppBar } from 'react-admin';

export const JucyAppBar = () => {
  return (
    <>
      <AppBar sx={{ justifyContent: 'center' }} />
      <Box flex={1}>
        <img src={logo} alt="Logo" width="150" />
        <Typography variant="h4">Performance</Typography>
      </Box>
    </>
  );
};
