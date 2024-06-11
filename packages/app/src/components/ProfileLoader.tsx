import React from 'react';
import {useGetUserProfile} from '../hooks/useGetUserProfile';

export const ProfileLoader = ({children}:{children?:React.ReactNode}) => {
    const {data, error, isLoading} = useGetUserProfile();
    // console.log('ProfileLoader',{data,error, isLoading});
    // console.log('user profile data: ', data, ' \n isLoading: ', isLoading);
    // if(isLoading){
    //     return <div>Loading...</div>
    // }
    return children
};
