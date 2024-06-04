import { getFunctions, httpsCallable } from 'firebase/functions';
import {Employee,employeeSchema} from '@jucy-askja/common/schemas/Employee'
const functions = getFunctions();
export const getUserProfile = async ()=>{
    const response = await httpsCallable<unknown,Employee>(functions, 'getProfile')()

    return  employeeSchema.parse( response.data);

};
