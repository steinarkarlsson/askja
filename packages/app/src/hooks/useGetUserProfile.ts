import { getUserProfile } from '../services/getUserProfile';
import { useQuery } from '@tanstack/react-query';


export const useGetUserProfile = () => {
    return useQuery({ queryKey: ['booking'], queryFn: getUserProfile });
};
