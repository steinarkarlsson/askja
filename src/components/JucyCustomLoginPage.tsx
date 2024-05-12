import LockIcon from '@mui/icons-material/Lock';
import { Alert, AlertTitle, Avatar, Box, Card, CircularProgress, Theme } from '@mui/material';
import firebase from 'firebase/compat/app';
import { action, autorun, makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { LoginComponent, useLogin } from 'ra-core';
import { LoginProps } from 'ra-ui-materialui';
import React, { useEffect, useRef } from 'react';
import {config} from '../config';

class LoginPageStore {
    user: firebase.User | null = null;

    idToken: string | null = null;

    askjaLoading = true;

    message: string | null = 'Loading';
    redirecting = false;

    error: Error | null = null;
    token: { askja: string;} | null = null;

    constructor() {
        makeAutoObservable(this);

        firebase.auth?.onAuthStateChanged(async (user) => {
            if (user && this.user?.email !== user.email) {
                runInAction(() => {
                    this.user = user;
                    this.message = 'Loading database credentials';
                });

                const token = await firebase.getTokens().catch(action((e) => {
                    this.error = e;
                }));
                if (token) {
                    runInAction(() => {
                        this.token = token;
                    });
                }
            }
            runInAction(() => {
                this.loading = false;
            });
        });

        autorun(() => {
            if (!this.loading && !this.redirecting && !this.user) {
                runInAction(() => (this.redirecting = true));
                firebase?.auth?.getRedirectResult().then((result) => {
                    if (!result.user) {
                        runInAction(() => {
                            this.message = 'Redirecting';
                        });
                        firebase?.auth?.onAuthStateChanged(async () => {
                            const provider = new firebase.auth.OAuthProvider('microsoft.com');
                            provider.setCustomParameters({
                                tenant: config.msConfig.tenantId,
                                clientId: config.msConfig.clientId,
                            });
                            await firebase?.auth?.signInWithRedirect(provider);
                        });
                    } else {
                        runInAction(() => {
                            this.message = 'Signing in';
                        });
                    }
                });
            }
        });

        autorun(() => {
            if (this.authenticated) {
                runInAction(() => {
                    this.message = 'Signing in';
                });
            }
        });

        autorun(() => {
            if (this.user?.getIdToken) {
                this.user.getIdToken().then((t) => {
                    runInAction(() => {
                        this.idToken = t;
                    });
                });
            }
        });
    }

    get authenticated() {
        return Boolean(this.user && this.idToken && !this.error);
    }
}
const store = new LoginPageStore();

const JucyCustomLoginPage: React.FC<LoginProps> = observer(() => {
    const login = useLogin();
    const authenticated = store.authenticated;
    const hasLoggedInRef = useRef(false);
    useEffect(() => {
        if (authenticated && !hasLoggedInRef.current) {
            hasLoggedInRef.current = true;
            login({ username: store.user?.email || '' }).catch((e: Error) => {
                runInAction(() => {
                    store.error = e || new Error('Unable to log you in');
                });
            });
        }
    }, [login,authenticated]);

    return (
        <Box
            sx={{
                height: '100vh',
                '.RaLogin-card': {
                    position: 'relative',
                    zIndex: 1,
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background:
                    'url(https://aadcdn.msauthimages.net/81d6b03a-qoi1sj0b-jedyqhmr1ee2lkugok698aiatxhqseod0a/logintenantbranding/0/illustration?ts=637291661041084892)',
                '&:after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.55)',
                },
            }}
        >
            <Card
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    minWidth: 300,
                    marginTop: '6em',
                }}
            >
                <Box
                    sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar
                        sx={(theme: Theme) => ({
                            backgroundColor: theme.palette.grey['500'],
                        })}
                    >
                        <LockIcon />
                    </Avatar>
                </Box>
                <Box paddingX={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                     zIndex={1} position="relative">
                    {store.error ? (
                        <Box paddingBottom={2}>
                            <Alert severity="error">
                                <AlertTitle>Authentication failure</AlertTitle>
                                There was an error while trying to authenticate:
                                <br />
                                <br />
                                <em>{store.error.message || 'Unknown error'}</em>
                            </Alert>
                        </Box>
                    ) : (
                        <>
                            <CircularProgress className="animated fadeIn" />
                            <Box padding={1}>{store.message}</Box>
                        </>
                    )}
                </Box>
            </Card>
        </Box>
    );
});

export default JucyCustomLoginPage as LoginComponent;