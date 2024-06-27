import { useGetIdentity } from 'ra-core';
import { getUserProfile } from '../services/getUserProfile';

const useWaitForIdentity = () => {
    const { refetch } = useGetIdentity();
    return async () =>
        new Promise((resolve) => {
            const doRefetch = () => {
                if (!refetch) {
                    resolve(null);
                    return;
                }
                refetch().then(({ data }) => {
                    if (data) {
                        getUserProfile();
                        resolve(data);
                        return;
                    }
                    setTimeout(doRefetch, 100);
                });
            };
            doRefetch();
        });
};

export default useWaitForIdentity;
