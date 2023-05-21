import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/user/user-slice';

import './Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(true);
    const [currentUser, setCurrentUser] = useState({} as any);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('email: ', email);
        console.log('password: ', password);
        console.log('checked: ', checked);
    }, [email, password, checked]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            setCurrentUser(response.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        console.log('currentUser: ', currentUser);

        if (currentUser) {
            dispatch(login({
                uuid: currentUser.uuid,
                email: currentUser.email,
                rememberMe: checked,
                dName: currentUser.dName,
                profilePic: currentUser.profilePic,
                jwt: currentUser.jwt,
                isLoggedIn: true,
                groups: currentUser.groups
            }));
        }
    }, [currentUser]);

    return (
        <Container component="div" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        value="stay-logged-in"
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label="Stay logged in"
                        labelPlacement="end"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;