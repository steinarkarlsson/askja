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
        apiKey: 'AIzaSyCq2KfPA-P_rNTVTP0LSt_Zzk8b5xsFJF8',
        authDomain: 'perfomus-65431.firebaseapp.com',
        projectId: 'perfomus-65431',
        storageBucket: 'perfomus-65431.appspot.com',
        messagingSenderId: '530854065913',
        appId: '1:530854065913:web:ae0b75685db5229deb9428',
        emulator: {
            // auth: { host: 'localhost', port: 9099 },
            // functions: { host: 'localhost', port: 5001 },
            // firestore: { host: 'localhost', port: 8080 },
            // storage: { host: 'localhost', port: 9199 },
            // database: { host: 'localhost', port: 9000 },
        },
    },
    msConfig: {
        tenantId: '',
        clientId: '',
    },
};
