import { getUserProfile } from '../services/getUserProfile';
import { useQuery } from '@tanstack/react-query';
import { useGetIdentity } from 'react-admin';


export const useGetUserProfile = () => {
    const { data: identity, isLoading: identityLoading } = useGetIdentity();

    return useQuery({
        queryKey: ['employee', identity?.id],
        queryFn: getUserProfile,
        enabled: Boolean(!identityLoading && identity),
    });
};
