import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {theme} from './../lib/appearance';
import {ThemeProvider} from '@mui/material';


const queryClient = new QueryClient()


export const Providers = ({children}:{children:React.ReactNode}) => {
    return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    {children}
                    <ToastContainer/>
                </ThemeProvider>
            </QueryClientProvider>
    );
};
