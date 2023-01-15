import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navigation = ({isSignedIn }) => {

    return (

        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Meme Generator
                        </Typography>
                        <Link to="/profile">
                            <Button color="inherit">Profile</Button>
                        </Link>
                        <Link to="/register">
                            <Button color="inherit">Registrieren</Button>
                        </Link>
                        <Link to="/">
                            <Button color="inherit">Home</Button>
                        </Link>
                        <Link to="/editor">
                            <Button color="inherit">Editor</Button>
                        </Link>

                        {isSignedIn
                            ?
                            <Link to="/"><Button  color="inherit" onClick={() => window.location.reload()}>Signout</Button></Link>
                            : <Link to="/signin"><Button  color="inherit">Login</Button></Link>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
export default Navigation; 