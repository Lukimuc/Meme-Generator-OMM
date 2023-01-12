import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


class Login extends React.Component {

    render () {
        return (
            <div>
            <h1 style={{
                textAlign:'center'
            }}> Login </h1>

    <Grid container p={10}>
        <Grid unit md={12} style={{
             left: 0,
             top: 0,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center'

        }}>
        <form>
       
            <TextField required id="outlined-basic" helperText="Username"type="text"style={{
                backgroundColor: 'white', 
                borderRadius:'0.25rem', marginBottom: 10 }}/>
                <br/>
                 <TextField helperText="Password"id="outlined-basic" type="password"style={{
                backgroundColor: 'white', 
                borderRadius:'0.25rem', marginBottom: 10 }}/>
                </form>
                <Button variant="contained" style={{
                    marginBottom: 10 
                }}>Sign in</Button>
                <Button variant="contained">Register with Third Party</Button>
             
                </Grid>
               
                </Grid>
</div>
        );
    }
}

export default Login;