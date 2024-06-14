import { httpsCallable } from 'firebase/functions';
import { Employee } from '@jucy-askja/common/schemas/Employee';
import { functions } from '../lib/init';

export const getUserProfile = async ()=>{
    const response = await httpsCallable<unknown,Employee>(functions, 'getProfile')()
    //return  employeeSchema.parse( response.data);
return response.data
};
