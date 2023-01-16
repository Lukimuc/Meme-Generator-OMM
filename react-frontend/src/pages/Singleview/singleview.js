import React from 'react';
import { useParams } from "react-router-dom";
import  { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box, {img} from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Meme} from '../Home/Meme';
/*import {Likes} from '../Components/likes';*/
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import TextareaValidator from './TextareaValidator.js';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useLocation } from 'react-router-dom';
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";


export function Singleview(template) {
    const { id } = useParams();

    /* const {template} = props;
  const [memeImgUrl, setMemeImgUrl] = useState('');*/
 /* const [template, setTemplate] = useState({});*/
  const [templates, setTemplates] = useState({});
  /*
  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes/${id}`)
    .then(x => x.json())
    .then(response => setTemplates(response.data.memes))
    
      .catch(error => console.log(error));
      setTemplates(data.url);
  }, [id]);
  */
  const showRandom = () => {
   /*Depending on which method we are using: attaching a random ID on the URL to load another meme*/
  }

  const steps = [
    {
      label: '{template.name}',
      imgPath: '{template.url}'
    },
    {
      label: 'Templatename 2',
      imgPath:'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Templatename3',
      imgPath:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
    }
  ];
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
    /*
    let match = useMatch("/memes/:id");
    let memeId;
    if (match && match.params) {
      memeId = match.params.id;
    }*/
    
  const handleCommentSubmit = (event) => {
      event.preventDefault();
      setComments([...comments, newComment]);
      setNewComment('');
  }
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;
    const handleNext = () => {
     /* setActiveStep((prevActiveStep) => prevActiveStep + 1);*/
     /* if [activeStep] == null {
        prevActiveStep == 1;
      }*/
      setActiveStep((prevActiveStep) => prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const autoPlay = () => {
      const interval = setInterval(handleNext, 10000);
      return interval;
    }
    const clearAutoplay = (interval) => {
      clearInterval(interval);
    }
   /* useEffect(() => {
      setInterval(handleNext, 5000)
    }, [])*/
  /*
    const Singleview = (props) => {
      const template = props.template;
      // use template here
    }*/
  
     /* const { id } = useParams();
      const [template, setTemplate] = useState({});
      useEffect(() => {
          fetch(`https://api.imgflip.com/get_memes/${id}`)
          .then(x => x.json()
              .then(response => setTemplate(response.data))
          );
      }, []);*/
    
      /*  const { memes } = this.props;*/
      
      return (
        
       <div>
        
          <Grid container spacing={2} paddingLeft={30} paddingTop={10} paddingRight={30}style={{ }}>
            
            <Grid item md={8}>
            <h1> Meme ID - gelesen aus URL: {id}</h1>
        <Box sx={{ maxWidth: 600, flexGrow: 1}}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box style={{width: '600px'}} 
    md={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
  <img src={steps[activeStep].imgPath} alt={steps[activeStep].label} 
         style={{ display: 'block', maxWidth: 1000, width:'100%', overflow: 'hidden' }}
       
  />
 {/*} {template && <Meme template={template} name={template.name}  />}
   
        <Meme template={template}/> 
  {template && <img src={template.url} />}
        {template && <p>{template.name}</p>}*/}
<div>
  <img src={template.url} alt={template.name}/>
</div>
  {/*<img src={template.imgPath} alt={props.template.name} />*/}
    </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
      <Button variant="contained" onClick={showRandom()} style={{margin:10}}>Random meme</Button>
            <Button variant="contained" /*onClick={autoPlay()} */style={{margin:10}}>Start Autoplay ▶</Button>
            <Button variant="contained" /*onClick={clearAutoplay()}*/ style={{margin:10}}>Stop Autoplay ||</Button>
      </Grid>
      <Grid item md={4}>
        {/*{template.name}*/}
     {/*<Likes /*likes={likes}*/}
       Likes: Platzhalter <br/>
       <Link to="/editor"><Button variant="contained">Edit this template</Button></Link>
       <h2> Comments: </h2>
      <div style={{
      paddingTop: 10,
      paddingBottom: 10
     }}>
     <Card>
     <CardHeader
                  avatar={
                    <Avatar  aria-label="recipe">
                      User
                    </Avatar>
                  }
                  title={
                    "User123"
                  }
                  subheader={
                    "Das ist ein Beispielkommentar"
                  }
                />
              </Card>

             {/*} Code for Mapping Comments later on
              <div>
              {comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
              ))}
              </div>*/}

              </div>
              You need to login to comment. Sign in <Link to="/signin"> here </Link> <br/>
             <TextareaValidator 
           style={{paddingBottom: 30}}
              id="newComment"
              label="Add a comment"
             /* value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            onSubmit={handleCommentSubmit}*//>
      </Grid>
      </Grid>
                  </div>
      )
            };




 