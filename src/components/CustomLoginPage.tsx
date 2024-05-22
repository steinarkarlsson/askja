import LockIcon from '@mui/icons-material/Lock';
import {Alert, AlertTitle, Avatar, Box, Button, Card, CircularProgress, TextField, Theme} from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {LoginComponent, useLogin, useGetIdentity} from 'ra-core';
import {LoginProps} from 'ra-ui-materialui';
import React, {useEffect, useRef, useState} from 'react';
import {getAuth, OAuthProvider, signInWithPopup} from "firebase/auth";
import {config} from "../config";
import {useNotify} from "react-admin";
import {Navigate} from "react-router-dom";

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
    tenant: config.msConfig.tenantId
});


if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
}


const auth = getAuth();

const useWaitForIdentity = () => {
    const { refetch} = useGetIdentity();
  return async () => new Promise((resolve, reject) => {
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

const CustomLoginPage: React.FC<LoginProps> = () => {
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const waitForIdentity = useWaitForIdentity()
    console.log({
        loading,loginSuccess
    })

    const handleStaffLogin = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                const idToken = credential?.idToken;
                setLoginSuccess(Boolean(accessToken && idToken));
                if (!accessToken || !idToken) {
                    console.log('Invalid credentials')
                    notify('Invalid email or password')
                    return
                }
                waitForIdentity().then((data) => {
                    console.log({data});
                    setLoading(false);

                })
                // setInterval(()=>{
                //     refetch();
                //     setLoading(false);
                //
                // },10000)

                /// if we have accessToken and IdToken, redirect to home page
                // Show error if not// toast thing
            })
            .catch((error) => {
                setLoading(false);
                // Show error to user. toast thing
                console.log({error})
                notify('Invalid email or password')
                setError(error);
            });

    }


    if (error) {
        return <Container>
            <Box paddingBottom={2}>
                <Alert severity="error">
                    <AlertTitle>Authentication failure</AlertTitle>
                    There was an error while trying to authenticate:
                    <br/>
                    <br/>
                    <em>{'Unknown error'}</em>
                </Alert>
            </Box>
        </Container>
    }

    if (loading) {
        return <Container>
            <CircularProgress className="animated fadeIn"/>
        </Container>
    }

    if (loginSuccess) {
        console.log('Navigation home', {             loginSuccess        })
        return <Navigate to={"/"}/>
    }
    return (
        <Container>
            <LoginForm/>
            <hr/>
            <Button onClick={handleStaffLogin}>Staff login</Button>
        </Container>
    );
};

const LoginForm = () => {
    const login = useLogin();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    return <>
        <TextField
            label="Email"
            type="email"
            margin="normal"
            required
            fullWidth
            variant="filled"
            onChange={(e) => setUsername(e.target.value as string)}
            value={username}
        />
        <TextField
            label="Password"
            type="password"
            margin="normal"
            required
            fullWidth
            variant="filled"
            onChange={(e) => setPassword(e.target.value as string)}
            value={password}
        />
        <Button onClick={() => login({username, password})}>Submit</Button>
    </>
}

const Container = ({children}: { children: React.ReactNode }) => {
    return <Box
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
                    <LockIcon/>
                </Avatar>
            </Box>
            <Box paddingX={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                 zIndex={1} position="relative">
                {children}
            </Box>
        </Card>
    </Box>
}

export default CustomLoginPage as LoginComponent;