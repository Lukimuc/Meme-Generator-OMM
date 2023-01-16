import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';

const theme = createTheme();

const SignIn = (props) => {
    // -------  Login via Form Input --------- //
    const [signInEmail, setSignInEmail] = useState();
    const [signInPassword, setSignInPassword] = useState();
    const navigate = useNavigate();


    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch('http://localhost:3002/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    props.loadUser(user);

                    navigate("/", { state: { key: "value" } })
                }
            })
    }

    // -------  Login via Google --------- //
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "361084581920-fefopqdbtsuusk3a8mcbhuea7li535rl.apps.googleusercontent.com",
            callback: handleGoogleResponse
        }
        )

        google.accounts.id.renderButton(
            document.getElementById("signInDiv2"),
            { theme: "outline", size: "large", text:"signin_with",shape: "pill" }
        );
    }, [])

    function handleGoogleResponse(response) {
        var userGoogleObject = jwt_decode(response.credential);
        //console.log(userGoogleObject);

        // load user data into state
        fetch('http://localhost:3001/signinGoogle', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userGoogleObject.email,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    props.loadUser(user);
                    navigate("/", { state: { key: "value" } })
                }
            })

    }
    // -------  Render Login Form + Google Button --------- //

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onEmailChange}
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
                            onChange={onPasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={onSubmitSignIn}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            id="login"
                        >
                            Login
                        </Button>


                        <Grid container>
                            <Grid item ><div id="signInDiv2"></div> </Grid>
                            <Grid item>
                                <Link to="/register">
                                    <Typography variant="body2" style={{ cursor: 'pointer' }} >
                                        Don't have an account? Sign Up
                                    </Typography>
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>


            </Container>
        </ThemeProvider>
    );
}
export default SignIn;