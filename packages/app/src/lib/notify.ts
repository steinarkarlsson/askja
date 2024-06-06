import { toast } from 'react-toastify';




export const notify = () =>  {

    toast.success('Submitted!', {
        position: 'bottom-center',
    });
}
