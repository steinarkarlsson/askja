import { Button, TextField } from '@mui/material';
import React from 'react';

interface SignUpFormProps {
  setSignUpEmail: (email: string) => void;
  signUpEmail: string;
  handleSignUpRequest: (email: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  setSignUpEmail,
  signUpEmail,
  handleSignUpRequest,
}) => {
  return (
    <>
      <TextField
        label="Email"
        type="email"
        margin="normal"
        required
        fullWidth
        variant="filled"
        onChange={(e) => setSignUpEmail(e.target.value as string)}
        value={signUpEmail}
      />
      <Button
        onClick={() => handleSignUpRequest(signUpEmail)}
        variant="contained"
      >
        Submit
      </Button>
    </>
  );
};

export default SignUpForm;
