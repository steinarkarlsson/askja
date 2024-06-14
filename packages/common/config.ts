export type EmulatorConfig = {
    host: string;
    port: number;
};
export type Config = {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        emulator?: {
            auth?: EmulatorConfig;
            functions?: EmulatorConfig;
            firestore?: EmulatorConfig;
            storage?: EmulatorConfig;
            database?: EmulatorConfig;
        };
    };
    msConfig: {
        tenantId: string;
        clientId: string;
    };
};

export const config: Config = {
    firebaseConfig: {
        apiKey: 'AIzaSyAB2sOi8FJlfznjci4kwD5mt0kdWfPY6pY',
        authDomain: 'jucy-askja.firebaseapp.com',
        projectId: 'jucy-askja',
        storageBucket: 'jucy-askja.appspot.com',
        messagingSenderId: '932290405279',
        appId: '1:932290405279:web:b1353abcc8fe621ea753aa',
        emulator: {
            // auth: { host: 'localhost', port: 9099 },
            // functions: { host: 'localhost', port: 5001 },
            // firestore: { host: 'localhost', port: 8080 },
            // storage: { host: 'localhost', port: 9199 },
            // database: { host: 'localhost', port: 9000 },
        },
    },
    msConfig: {
        tenantId: '388a7ead-88d2-4311-aaca-8af448624ddd',
        clientId: '68971ec6-8bba-4a15-9acd-007c8c2ad929',
    },
};
