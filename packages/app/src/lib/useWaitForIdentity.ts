import {useGetIdentity} from "ra-core";

const useWaitForIdentity = () => {
    const {refetch} = useGetIdentity();
    return async () => new Promise((resolve) => {
        const doRefetch = () => {
            if (!refetch) {
                resolve(null);
                return
            }
            console.log('Fetching identity...')
            refetch().then(({data}) => {
                if (data) {
                    console.log('   fetched identity', {data})
                    resolve(data);
                    return
                }

                console.log('   no identity data')
                setTimeout(doRefetch, 100)
            })
        }
        doRefetch();
    });

}

export default useWaitForIdentity;