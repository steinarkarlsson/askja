import React from 'react';
import {useGetIdentity} from 'react-admin';
import {Box, CircularProgress} from '@mui/material';
import {ErrorComponent} from './ErrorComponent';
import {Navigate} from 'react-router-dom';
import {useGetUserProfile} from '../hooks/useGetUserProfile';

export const ProfileLoader = ({children}:{children?:React.ReactNode}) => {
    const {data: identity, isLoading: identityLoading, error: identityError} = useGetIdentity();
    const {data:profile,isLoading:isProfileLoad}=useGetUserProfile();

    if (identityLoading ||isProfileLoad) {
        return (
                <Box display="flex" justifyContent="center" padding={2} width="100%">
                    <CircularProgress/>
                </Box>
        );
    }
    if (identityError) {
        return <ErrorComponent error={identityError}/>;
    }
    if ( !identity) {
        return <Navigate to="/login"/>;
    }
    if ( !profile) {
        return <>
        No emploee record... go talk to hjr

            No Record for ytour email
        </>
    }
    return children
};
