import * as React from 'react';
import {useGetIdentity} from 'react-admin';
import {Box, CircularProgress, Typography} from '@mui/material';
import {ReviewList} from './review/ReviewList';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import {ErrorComponent} from './ErrorComponent';

export default (...props: any) => {
    const {isLoading: identityLoading, error: identityError} = useGetIdentity();
    const {data: profile} = useGetUserProfile();

    if (identityLoading) {
        return (
                <Box display="flex" justifyContent="center" padding={2} width="100%">
                    <CircularProgress/>
                </Box>
        );
    }

    if (identityError) {
        return <ErrorComponent error={identityError}/>;
    }

    return (
            <>
                <Box sx={{marginTop: 10, marginX: 40}}>
                    <Typography variant="h4">Your KPIs</Typography>
                    <ReviewList resource='selfReview' reviewType='selfReview' {...props}/>
                </Box>
                {profile?.role === 'employee' ? null :
                        <Box sx={{marginTop: 10, marginX: 40}}>
                            <Typography variant="h4">Your Employee KPIs</Typography>
                            <ReviewList resource='employeeReview' reviewType='employeeReview' {...props}/>
                        </Box>
                }
            </>
    );
}
;
