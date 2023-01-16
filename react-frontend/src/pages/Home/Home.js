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
import {Meme} from './Meme'


const ExpandMore = styled((props) => {
  const { expand } = props;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    return <IconButton></IconButton>
  };
  /*only runs after first render*/
  /*fetching memes*/
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
 
  const [count, setCount] = useState(0);
  const [memeLimit, setMemeLimit] = useState(12);
  const limitedTemplates = templates.slice(0, memeLimit);
  const [searchValue, setSearchValue] = useState('');
  const filteredTemplates = limitedTemplates.filter(template => template.name.toLowerCase().includes(searchValue.toLowerCase()));
  
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(x => x.json()
      .then(response => setTemplates(response.data.memes))
    );
  }, []);
  /*const limitedTemplates = templates.slice((page - 1) * 12, page * 12);*/
  const handleLoadMore = () => {
    setMemeLimit (memeLimit+12);
  };
  return (
    <div>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Check out already created memes</h1>
      <div style={{paddingBottom:50, paddingRight:30}}>
      <FormControl style={{width:200, float:'right'}}>
  <InputLabel id="demo-simple-select-label" placeholder="Filter Memes">Filter Memes</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    size="small"
     /*Filterbox, erst einblenden, wenn es eine Methode gibt, da sonst Error}
    value={}
    label="Age"
onChange={handleChange} */
  >
    <MenuItem value={10}>Newest Memes</MenuItem>
    <MenuItem value={20}>Memes with most Likes</MenuItem>
  </Select>
</FormControl> 
</div>
<Paper style={{ float: 'right', marginRight:30}}
      component="form"
      md={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Meme suchen, z.B. 'Doge'"
       /* inputProps={{ 'aria-label': 'search google maps' }*/
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
        </Paper>
      
    <Grid container spacing={2} style={{padding:30}}>
      {filteredTemplates.map((template) => {
        return (
          <Grid item xs={3} key={template.id}>
            <Card style={{ maxWidth: 345, maxHeight: 600 }}>
              <CardHeader
                avatar={
                  <Avatar>
                    R
                  </Avatar>
                }
                title={template.name}
               /* subheader="Create Date:"*/
              />
             {/* <Link to={{pathname: '/singleview', state: {id: template.id}}}> */}
             
              <CardMedia style={{alignItems: 'center'} } onClick={() => {
                    setTemplate(template);
                  }}>
                     <Link key={template.id} to={{pathname:`/memes/${template.id}`,  state:{template: template}}}>
        
            {/*}  <Link key={template.id} to={`/memes/${template.id}`}>*/}
                <Meme
                template={template}
               
               /*   onClick={() => {
                    setTemplate(template);
                  }
                  }*//>
                   </Link>
              </CardMedia>
             
              
              <CardContent>
              <Typography variant="body2" color="text.secondary">
        <b>  {count} {count === 1 ? "Like" : "Likes"} </b>
        </Typography>
        </CardContent>
              <CardActions disableSpacing>
              {/*<Counter
        onCountChange={(count) => {
          setCount(count)
        }}
      />
      <p>Count is: {count}</p>*/}
      
    <IconButton onClick={() => setCount(count + 1)}>
      <ThumbUpIcon/>
    </IconButton>
    <IconButton onClick={() => setCount(count - 1)}>
      <ThumbDownIcon />
    </IconButton>
    <IconButton aria-label="share">
      <InsertCommentRoundedIcon />
    </IconButton>
    
    {/*<Button variant="contained" style={{ position:'relative', float:'right'}}>Edit Meme</Button>*/}
  </CardActions>
            </Card>
          </Grid>
      
        );
      })}
    </Grid>
    <div style={{display: 'flex', justifyContent: 'center', padding:40 }}>  
    <Button variant="contained" style={{backgroundColor:'red'}} onClick={handleLoadMore}>Load more Memes</Button>
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
    </div>
  );
      }   
