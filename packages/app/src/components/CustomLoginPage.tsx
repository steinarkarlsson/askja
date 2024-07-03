import {config} from '@jucy-askja/common/config';
import useWaitForIdentity from '../lib/useWaitForIdentity';
import Container from './authentification/Container';
import LoginForm from './authentification/LoginForm';
import SignUpForm from './authentification/SignUpForm';
import {Alert, AlertTitle, Box, Button, CircularProgress, Divider, Typography,} from '@mui/material';
import {
    getAuth,
    isSignInWithEmailLink,
    OAuthProvider,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signInWithPopup,
} from 'firebase/auth';
import 'firebase/compat/auth';
import {LoginComponent, useLogin} from 'ra-core';
import {LoginProps} from 'ra-ui-materialui';
import React, {useState} from 'react';
import {useNotify} from 'react-admin';
import {Navigate} from 'react-router-dom';

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
  tenant: config.msConfig.tenantId,
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
  };

  const handleSignUpRequest = (email: string) => {
    setShowSignUp(false);

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
  };

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
      setSignUpEmail(email as string);
    }
    if (email !== null) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');

          login(result.user).catch((error) => notify(error));
        })
        .catch((error) => notify(error));
    } else {
      notify('No email provided');
    }
  }

  const waitForIdentity = useWaitForIdentity();

  const handleStaffLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;
        setLoginSuccess(Boolean(accessToken && idToken));
        if (!accessToken || !idToken) {
          notify('Invalid email or password');
          return;
        }
        waitForIdentity().then((data) => {
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        notify('Invalid email or password');
        setError(error);
      });
  };

  if (error) {
    return (
      <Container>
        <Box paddingBottom={2}>
          <Alert severity="error">
            <AlertTitle>Authentication failure</AlertTitle>
            There was an error while trying to authenticate:
            <br />
            <br />
            <em>{'Unknown error'}</em>
          </Alert>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress className="animated fadeIn" sx={{ margin: '20px' }} />
      </Container>
    );
  }

  if (loginSuccess) {
    return <Navigate to={'/'} />;
  }
  return (
    <Container>
        <Typography variant="h6">Welcome!</Typography>
        Log in with
        <Button
                onClick={handleStaffLogin}
                variant="contained"
                sx={{ margin: '15px', width:'160px'}}
        >
            work email
        </Button>
        or
      {/*{showSIgnUp ? (*/}
      {/*  <SignUpForm*/}
      {/*    setSignUpEmail={setSignUpEmail}*/}
      {/*    signUpEmail={signUpEmail}*/}
      {/*    handleSignUpRequest={handleSignUpRequest}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <LoginForm handleShowSignUpForm={handleShowSignUpForm} login={login} />*/}
      {/*)}*/}
      {/*<hr style={{ width: '100%' }} />*/}
      <Button
        onClick={handleShowSignUpForm}
        variant="contained"
        sx={{ margin: '15px' , width:'160px'}}
      >
          personal email
      </Button>
    </Container>
  );
};

export default CustomLoginPage as LoginComponent;
