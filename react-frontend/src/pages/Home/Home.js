import React, { useEffect, useState, Component } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Fab from '@mui/material/Fab';
import { Meme } from './Meme';
import MemeLukasOverview from '../TestLukas/MemeLukasOverview';
import MemeLukas from '../TestLukas/MemeLukas';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useLocation } from "react-router-dom";
import Likebutton from "../../Components/Likebutton"

const Home = (props) => {

  const [memesfromServer, setMemesFromServer] = useState([]);
  const [count, setCount] = useState(0);
  const [memeLimit, setMemeLimit] = useState(12);
  const limitedTemplates = memesfromServer.slice(0, memeLimit);
  const [likes, setLikes] = useState(0);
  const [minLikes, setMinLikes] = useState(0);
  const [value2, setValue] = React.useState([0, 100]);

  const [searchValue, setSearchValue] = useState('');
  const filteredTemplates = limitedTemplates.filter(meme => meme.title.toLowerCase().includes(searchValue.toLowerCase()));

  const location = useLocation();
  const linkURL = location.pathname;
  const [, id] = linkURL.split("/memes/");

  //getTheMemes
  useEffect(() => {
    getMemes();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollY + clientHeight >= scrollHeight - 50) {
      handleLoadMore();
    }
  };



  const getMemes = (event) => {
    fetch('http://localhost:3002/memes', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(memes => {
        setMemesFromServer(memes);  // set the state of memesfromServer to the received memes
      })
  }

  const handleSliderChange = (event2, newValue) => {
    setValue(newValue);
    setMinLikes(newValue);
  };

  //filter by likes 

  const filteredTemplates2 = filteredTemplates.filter(meme => meme.likes >= value2[0] && meme.likes <= value2[1]);

  //Load more Memes
  const handleLoadMore = () => {
    setMemeLimit(prevMemeLimit => prevMemeLimit + 4);
    //setMemeLimit(memeLimit +12);
  };

  //Sort Memes by Creation Date
  const sortedMemes = [...memesfromServer].sort((a, b) => {
    return new Date(b.memeCreated) - new Date(a.memeCreated);
  });

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Check out already created memes</h1>
      <Typography style={{ display: 'flex', justifyContent: 'center' }}>Please log in to like memes. The newest memes are displayed at the bottom by default.</Typography>
      {/*</div><div style={{paddingBottom:50, paddingRight:30}}>*/}
      <Grid container>
        <Grid item xs={4} paddingLeft={5}>
          <Typography gutterBottom>Show memes with X likes</Typography>
          <Box width={'300px'}>
            <Slider onChange={handleSliderChange} defaultValue={[0, 100]} /*value={minLikes}*/ value={value2} valueLabelDisplay='auto' min={0} max={100} range disableSwap={true} />
          </Box> </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom>Sort</Typography>
          <FormControl alignItems="center" justify="center" style={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label" placeholder="Filter Memes">Sort Memes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
            /*Filterbox, erst einblenden, wenn es eine Methode gibt, da sonst Error}
           value={}
           label="Age"
         onChange={handleChange} */
            >
              <MenuItem onClick={() => setMemesFromServer(sortedMemes)}>New memes first</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} style={{ float: 'right' }}>
          <Paper style={{ float: 'right', marginRight: 30 }}
            component="form"
            md={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Filter memes"
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: 30 }}>
        {filteredTemplates2.map((meme, index) => {
          if (meme.status === "public") {
            /* {filteredTemplates.map((template) => {*/
            return (
              <Grid item xs={3} /*key={meme._id}*/ key={index}>
                <Card style={{ maxWidth: 345, maxHeight: 600 }}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        User
                      </Avatar>
                    }
                    title={meme.title}
                    subheader={`Created: ` + meme.memeCreated}
                  />
                  <CardMedia style={{ alignItems: 'center' }}>
                    <Link key={meme.id} to={`/memes/${meme._id}`}>
                      <MemeLukasOverview key={meme._id} meme={meme} /*value={memeId} onClick={handleMemeClick(meme)}*/ />{/*onClick={handleMemeClick(meme)*/}
                      { /*  setTemplate(template);*/}
                    </Link>
                    {console.log("meme.id", meme._id)}
                  </CardMedia>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Likebutton key={meme._id} meme={meme} id={id} isSignedIn={props.isSignedIn} user={props.user} email={MemeLukas.email} likes={props.likes} likedBy={props.likedBy}  /*updateMeme={updateMeme}*/>Like</Likebutton>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      {/*}  <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={handleLoadMore}>Load more Memes</Button>*/}
        <Link to="/editor">
          <Fab color="primary" aria-label="add" style={{
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
    </div>
  );
}

export default Home;