import { getAbsolutePath, log, logError, logger, MakeFirestoreLogger, retrieveStatusCode } from '../misc';
import { FireApp } from '../misc/firebase-models';
import * as ra from '../misc/react-admin-models';
import { Create, Delete, DeleteMany, Update, UpdateMany } from './commands';
import { FirebaseWrapper, FireClient } from './database';
import { RAFirebaseOptions } from './options';
import { GetList, GetMany, GetManyReference, GetOne } from './queries';
import sortFilterPaginate from '../../arrayUtils';

const resourceMapping: { [key: string]: string } = {
    'selfReview': 'review',
    'employeeReview': 'review',
    'hrReview': 'review',
    'editReview': 'review',
};

export interface IDataProvider extends ra.DataProvider {
    app: FireApp;
}

export function DataProvider(
    firebaseConfig: {},
    optionsInput?: RAFirebaseOptions,
): IDataProvider {
    const options = optionsInput || {};
    verifyDataProviderArgs(firebaseConfig, options);

    const flogger = MakeFirestoreLogger(options);
    logger.SetEnabled(!!options?.logging);
    flogger.SetEnabled(!!options?.firestoreCostsLogger?.enabled);
    flogger.ResetCount(!options?.firestoreCostsLogger?.persistCount);
    log('Creating FirebaseDataProvider', {
        firebaseConfig,
        options,
    });

    const fireWrapper = new FirebaseWrapper(optionsInput, firebaseConfig);

    async function run<T>(cb: () => Promise<T>) {
        let res: any;
        try {
            res = await cb();
            return res;
        } catch (error) {
            const errorMsg = ((error as any) || '').toString();
            const code = retrieveStatusCode(errorMsg);
            const errorObj = { status: code, message: errorMsg, json: res };
            logError('DataProvider:', error, { errorMsg, code, errorObj });
            throw errorObj;
        }
    }

    const client = new FireClient(fireWrapper, options, flogger);


    return {
        app: fireWrapper.GetApp(),
        async getList<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.GetListParams,
        ): Promise<ra.GetListResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            const { q, ...outFilter } = params.filter;
            if (q) {
                const result = await GetList<RecordType>(resource, {
                    ...params,
                    pagination: { page: 1, perPage: 9999 },
                    filter: outFilter,
                }, client);
                return {
                    ...result,
                    ...sortFilterPaginate(result.data, params),
                };
            }

            return run(() => GetList<RecordType>(collection, params, client));
        },
        getOne<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.GetOneParams,
        ): Promise<ra.GetOneResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;

            return run(() => GetOne<RecordType>(collection, params, client));
        },
        getMany<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.GetManyParams,
        ): Promise<ra.GetManyResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            return run(() => GetMany<RecordType>(collection, params, client));
        },
        getManyReference<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.GetManyReferenceParams,
        ): Promise<ra.GetManyReferenceResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            return run(() => GetManyReference<RecordType>(collection, params, client));
        },
        update<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.UpdateParams,
        ): Promise<ra.UpdateResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            return run(() => Update<RecordType>(collection, params, client));
        },
        updateMany(
            resource: string,
            params: ra.UpdateManyParams,
        ): Promise<ra.UpdateManyResult> {
            const collection = resourceMapping[resource] || resource;
            return run(() => UpdateMany(collection, params, client));
        },
        create<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.CreateParams,
        ): Promise<ra.CreateResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            return run(() => Create<RecordType>(collection, params, client));
        },
        delete<RecordType extends ra.RaRecord = ra.RaRecord>(
            resource: string,
            params: ra.DeleteParams,
        ): Promise<ra.DeleteResult<RecordType>> {
            const collection = resourceMapping[resource] || resource;
            return run(() => Delete(collection, params, client));
        },
        deleteMany(
            resource: string,
            params: ra.DeleteManyParams,
        ): Promise<ra.DeleteManyResult> {
            const collection = resourceMapping[resource] || resource;
            return run(() => DeleteMany(collection, params, client));
        },
    };
}

function verifyDataProviderArgs(
    firebaseConfig: {},
    options?: RAFirebaseOptions,
) {
    const hasNoApp = !options || !options.app;
    const hasNoConfig = !firebaseConfig;
    if (hasNoConfig && hasNoApp) {
        throw new Error(
            'Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider',
        );
    }
    if (options && options.rootRef) {
        // Will throw error if rootRef doesn't point to a document
        getAbsolutePath(options.rootRef, 'test');
    }
}
