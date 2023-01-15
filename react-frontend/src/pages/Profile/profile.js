import React from 'react'
import { Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StepConnector from '@mui/material/StepConnector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';



class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            // tbd
        }
    }



    // ------   get User Data   ----- // 

    render() {


        return (


            <Container>



                <Paper elevation={1} style={{ padding: "25px", margin: "20px" }}>

                    <Typography variant="h5">Profile</Typography>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>ID </Typography>
                        <p style={{ display: "inline" }}>bla</p>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>E-Mail </Typography>
                        <p style={{ display: "inline" }}>bla</p>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>Firstname </Typography>
                        <p style={{ display: "inline" }}>bla</p>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" style={{ display: "inline" }}>Lastname </Typography>
                        <p style={{ display: "inline" }}>bla</p>
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

                        </Grid>
                    </Box>
                </Paper>




            </Container>

        );
    }
}
export default Profile; 