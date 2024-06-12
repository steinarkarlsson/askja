import { createWriteStream, readFileSync } from 'node:fs';
import { get } from 'node:http';
import { join, resolve } from 'node:path';
import { afterAll, assert, beforeAll, beforeEach, describe, test } from 'vitest';
import { RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { expectFirestorePermissionDenied, expectPermissionGetSucceeds, getFirestoreCoverageMeta } from './utils';

let testEnv: RulesTestEnvironment;

/**
 * The emulator will accept any database name for testing.
 */
const DATABASE_NAME = 'database-emulator-example';
const PROJECT_ID = 'fakeproject';
const RULES_FILE = resolve(join(__dirname, '../../../../firestore.rules'));
const protectedTables = [ 'reviewPeriod', 'template'];

beforeAll(async () => {
    const { host, port } = getFirestoreCoverageMeta(DATABASE_NAME);
    testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID,
        firestore: {
            port,
            host,
            rules: readFileSync(RULES_FILE, 'utf8'),
        },
    });
});
beforeEach(async () => {
    // Clear the database between tests
    await testEnv.clearFirestore();
});

afterAll(async () => {
    // Write the coverage report to a file
    const { coverageUrl } = getFirestoreCoverageMeta(PROJECT_ID);
    const coverageFile = './firestore-coverage.html';
    const fstream = createWriteStream(coverageFile);
    await new Promise((resolve, reject) => {
        get(coverageUrl, (res) => {
            res.pipe(fstream, { end: true });
            res.on('end', resolve);
            res.on('error', reject);
        });
    });
    console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});

describe('My app', () => {
    test('require users to log in before reading a review', async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const review = db.collection('review').doc('bilbo-review');
        await expectFirestorePermissionDenied(review.get());
    });

    test('employee can read their own review', async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().collection('review').doc('bilbo-review').set({
                employeeId: 'bilbo',
                managerId: 'manager',
            });
        });
        const db = testEnv
            .authenticatedContext('bilbo', {
                email: 'bilbo@jucyworld.com',
                role: 'manager',
                employeeId: 'bilbo',
            })
            .firestore();
        const review = db.collection('review').doc('bilbo-review');
        await expectPermissionGetSucceeds(review.get());
    });

    test('employee can not read other reviews', async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
            const db = context.firestore();
            await db.collection('review').doc('frodos-review').set({
                employeeId: 'frodo',
            });
        });

        const db = testEnv
            .authenticatedContext('bilbo', {
                email: 'bilbo@jucyworld.com',
                role: 'manger',
                employeeId: 'bilbo',
            })
            .firestore();
        const review = db.collection('review').doc('frodos-review');
        await expectFirestorePermissionDenied(review.get());
    });

    test('managers can read employee reviews', async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
            const db = context.firestore();
            await db.collection('review').doc('frodos-review').set({
                employeeId: 'frodo',
                managerId: 'bilbo',
            });
        });

        const db = testEnv
            .authenticatedContext('bilbo', {
                email: 'bilbo@jucyworld.com',
                role: 'manger',
                employeeId: 'bilbo',
            })
            .firestore();
        const review = db.collection('review').doc('frodos-review');
        await expectPermissionGetSucceeds(review.get());
    });

    test('Non admins can not read protected tables', async () => {

        for (const table of protectedTables) {
            await testEnv.withSecurityRulesDisabled(async (context) => {
                const db = context.firestore();
                await db.collection(table).doc('doc-id').set({
                    foo: 'bar',
                    id: 'doc-id',
                });
            });
            const db = testEnv
                .authenticatedContext('bilbo', {
                    email: 'bilbo@jucyworld.com',
                    id: 'bilbo',
                })
                .firestore();
            const doc = db.collection(table).doc('doc-id');
            try {
                await expectFirestorePermissionDenied(doc.get());
            }catch (e){
                assert.fail(`${table} should not be readable by non-admins`)
            }
        }

    });

    test('admins can not read protected tables', async () => {
        for (const table of protectedTables) {
            await testEnv.withSecurityRulesDisabled(async (context) => {
                const db = context.firestore();
                await db.collection(table).doc('doc-id').set({
                    foo: 'bar',
                    id: 'doc-id',
                });
            });
            const db = testEnv
                .authenticatedContext('bilbo', {
                    email: 'bilbo@jucyworld.com',
                    id: 'bilbo',
                    role:'admin'
                })
                .firestore();
            const doc = db.collection(table).doc('doc-id');
            try {
                await expectPermissionGetSucceeds(doc.get());
            }catch (e){
                assert.fail(`${table} should be readable by admins`)
            }
        }
    });

});
