import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MemeLukas from '../TestLukas/MemeLukas';



const Profile = (props) => {
    const [memesfromServer, setMemesFromServer] = useState([]);
    const profileLink = "profile/" + props.user.id;


    useEffect(() => {
        getProfileMemes(); // call the function to get the memes from the server
    }, []);

    const getProfileMemes = () => {
        fetch('http://localhost:3002/' + profileLink, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(response => response.json())
            .then(memes => {
                if (memes.memes) setMemesFromServer(memes.memes); // set the state of memesfromServer to the received memes
            });
    }


    // ------   get User Data   ----- // 
    if (props.isSignedIn === true) {
        return (
            <Container>
                <Paper elevation={1} style={{ padding: "25px", margin: "20px" }}>
                    <Typography variant="h5">Profile</Typography>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>E-Mail </Typography>
                        <p style={{ display: "inline" }}>{props.user.email}</p>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>Firstname </Typography>
                        <p style={{ display: "inline" }}>{props.user.firstname}</p>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>Lastname </Typography>
                        <p style={{ display: "inline" }}>{props.user.lastname}</p>
                    </Box>
                </Paper>

                <Paper elevation={1} style={{ padding: "25px", margin: "20px" }}>
                    <Typography variant="h5" style={{ marginBottom: "25px" }}>Memes History</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Box style={{ height: "300px", textAlign: 'center', border: "dotted" }}>Meme 1</Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box style={{ height: "300px", textAlign: 'center', border: "dotted" }}>Meme 2</Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box style={{ height: "300px", textAlign: 'center', border: "dotted" }}>Meme 3</Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box style={{ height: "300px", textAlign: 'center', border: "dotted" }}>Meme 4</Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box style={{ height: "300px", textAlign: 'center', border: "dotted" }}>Meme 5</Box>
                            </Grid>

                            {memesfromServer.map((meme) => (
                                <Grid item md={4}>
                                    <MemeLukas key={meme._id} meme={meme} />
                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </Paper>
            </Container>
        );
    }
    else {
        return (
            <>
                <h2>You need to login to see your profile page</h2>
                <Link to="/signin">
                    <Button>Login</Button>
                </Link>
            </>
        )
    }
}

export default Profile;
