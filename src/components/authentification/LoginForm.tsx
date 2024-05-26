import React from "react";
import {Button, TextField} from "@mui/material";

interface LoginFormProps {
    handleShowSignUpForm: () => void;
    login: (data: {username: string, password: string}) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({handleShowSignUpForm, login}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <>
            <Button onClick={handleShowSignUpForm}>Sign up</Button>
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
    )
}

export default LoginForm;