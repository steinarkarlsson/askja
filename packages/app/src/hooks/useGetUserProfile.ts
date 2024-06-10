import { getUserProfile } from '../services/getUserProfile';
import { useQuery } from '@tanstack/react-query';
import { useGetIdentity, useGetOne } from 'react-admin';


export const useGetUserProfile = () => {
    const { data: identity, isLoading: identityLoading } = useGetIdentity();

    console.log('useGetUserProfile',{
        identity,
        enabled: Boolean(!identityLoading && identity),
    })
    console.log(identity?.id)
    return useQuery({
        queryKey: ['employee',identity?.id],
        queryFn: getUserProfile,
        enabled: Boolean(!identityLoading && identity),
    });
};
