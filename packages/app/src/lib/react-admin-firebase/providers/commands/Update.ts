import { log } from '../../misc';
import * as ra from '../../misc/react-admin-models';
import { FireClient } from '../database';
import { doc, updateDoc } from 'firebase/firestore';

export async function Update<T extends ra.RaRecord>(
    resourceName: string,
    params: ra.UpdateParams,
    client: FireClient,
): Promise<ra.UpdateResult<T>> {
    console.log(client.options.app?.name);

    const { rm } = client;
    log('Update', { resourceName, params });
    const id = params.id + '';
    delete params.data.id;
    const r = await rm.TryGetResource(resourceName);
    log('Update', { resourceName, resource: r, params });
    const data = await client.parseDataAndUpload(r, id, params.data);
    const docObj = { ...data };
    client.checkRemoveIdField(docObj, id);
    await client.addUpdatedByFields(docObj);
    const docObjTransformed = client.transformToDb(resourceName, docObj, id);
    console.log(r.collection);
    console.log(id);
    console.log(docObjTransformed);

    await updateDoc(doc(r.collection, id), docObjTransformed);
    return {
        data: {
            ...data,
            id: id,
        },
    };
}
