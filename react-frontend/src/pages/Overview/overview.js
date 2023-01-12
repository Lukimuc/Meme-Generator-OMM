import React, { useEffect, useState, Component } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Grid version 1
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


class Overview extends React.Component {
   /* constructor(){
        super()
        this.state ={
         randomImg:"",
         allMemeImg:""
        }
    }
    fetchMemes() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json)
        .then(response => {
            const {memes} = response.data
            this.setState({
                allMemeImg:memes
            })
        })
    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value

        })
    }*/

    render () {
        return (
            <div>      
                <h1 style={{
    textAlign:'center'
}}> Browse already existing memes </h1>
                <Grid container p={10} paddingLeft={40}>
            <Grid item md={8}>
                Hier kommt das Meme dann rein
                <div>
  </div>
                </Grid>
                <Grid item md={2}>      
                <div className="meme-form">
  <Button variant="contained">Show new meme</Button>
 
            </div>
            </Grid>
          
          <div className="meme">
        {/*}  <img src={this.state.randomImg} alt="/"></img>*/}
      </div>
<Grid md={4}>


Hier in das Grid kommt der Content rein
<Button variant="contained">Like</Button>
<Button variant="contained">Comment</Button>
<row style={{
     margin: 0,
     top: 'auto',
     bottom: 20,
     position: 'fixed'
    
}}><Button variant="contained">Load more content...</Button></row>

</Grid>
</Grid>
<Link to="/editor">
<Fab color="primary" aria-label="add"  style={{
                        margin: 0,
                        top: 'auto',
                        right: 20,
                        bottom: 20,
                        left: 'auto',
                        position: 'fixed',
                    }}>
  <AddIcon />
</Fab>
</Link>  

            </div>
        );
    }
}


export default Overview;
