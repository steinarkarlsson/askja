import {Alert, AlertTitle, Box, Button, CircularProgress} from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {LoginComponent, useLogin} from 'ra-core';
import {LoginProps} from 'ra-ui-materialui';
import React, {useState} from 'react';
import {
    getAuth,
    isSignInWithEmailLink,
    OAuthProvider,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signInWithPopup
} from 'firebase/auth';
import {config} from '../config';
import {useNotify} from 'react-admin';
import {Navigate} from 'react-router-dom';
import SignUpForm from './authentification/SignUpForm';
import Container from './authentification/Container';
import LoginForm from './authentification/LoginForm';
import useWaitForIdentity from '../lib/useWaitForIdentity';

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
    tenant: config.msConfig.tenantId
});

const CustomLoginPage: React.FC<LoginProps> = () => {
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [signUpEmail, setSignUpEmail] = React.useState('');
    const [showSIgnUp, setShowSignUp] = useState(false);

    const login = useLogin();
    const auth = getAuth();

    const handleShowSignUpForm = () => {
        setShowSignUp(true);
    }

    const handleSignUpRequest = (email: string) => {

        setShowSignUp(false);
        console.log('Sign up request', {email})

        const actionCodeSettings = {
            url: 'http://localhost:5173/#/review',
            handleCodeInApp: true,
        };

        const auth = getAuth();

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
            setSignUpEmail(email as string)
        }
        // The client SDK will parse the code from the link for you.
        if (email !== null) {
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    console.log(result)
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    login(result.user).catch((error)=>console.log(error))
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch((error) => console.log(error));
        } else {
            console.log('No email provided')
        }
    }

    const waitForIdentity = useWaitForIdentity()
    console.log({
        loading, loginSuccess
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
        console.log('Navigation home', {loginSuccess})
        return <Navigate to={'/'}/>
    }
    return (
        <Container>
            {showSIgnUp ?
                <SignUpForm setSignUpEmail={setSignUpEmail} signUpEmail={signUpEmail} handleSignUpRequest={handleSignUpRequest}/> :
                <LoginForm handleShowSignUpForm={handleShowSignUpForm} login={login}/>
            }
            <hr/>
            <Button onClick={handleStaffLogin}>Staff login</Button>
        </Container>
    );
};


export default CustomLoginPage as LoginComponent;
