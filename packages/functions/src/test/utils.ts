import { expect } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';

export const parseHostAndPort = (hostAndPort: string | undefined): { host?: string; port?: number } => {
    if (hostAndPort == undefined) {
        return {};
    }
    const pieces = hostAndPort.split(':');
    return {
        host: pieces[0],
        port: parseInt(pieces[1], 10),
    };
};

export const getFirestoreCoverageMeta = (projectId: string) => {
    const hostAndPort = parseHostAndPort(process.env.FIRESTORE_EMULATOR_HOST);
    const { host, port } = hostAndPort!; // hostAndPort != null ? hostAndPort : emulators.firestore!;
    const coverageUrl = `http://${host}:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;
    return {
        host,
        port,
        coverageUrl,
    };
};

export const expectFirestorePermissionDenied = async (promise: Promise<any>) => {
    const errorResult = await assertFails(promise);
    expect(errorResult.code).toBe('permission-denied' || 'PERMISSION_DENIED');
};

export const expectFirestorePermissionUpdateSucceeds = async (promise: Promise<any>) => {
    const successResult = await assertSucceeds(promise);
    expect(successResult).toBeUndefined();
};

export const expectPermissionGetSucceeds = async (promise: Promise<any>) => {
    const successResult = await assertSucceeds(promise);
    expect(successResult).not.toBeUndefined();
};
