import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box, { img } from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Grid from "@mui/material/Grid";
import TextareaValidator from "../../Components/TextareaValidator.js";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InputBase } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export function Singleview() {

  //getting String from URL
  const location = useLocation();
  const linkURL = location.pathname;
  const [, id] = linkURL.split("/memes/");
  const [searchValue, setSearchValue] = useState('');

  //for slideshow
  const [memesfromServer, setMemesFromServer] = useState([]);
  const [currentId, setCurrentId] = useState(id);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const navigate = useNavigate();

  //for autoplay
  const [autoplay, setAutoplay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  //for displaying the current meme
  const [memefromServer, setMemeFromServer] = useState([]);

  //get the meme from the server
  const getMeme = (event) => {
    //meme._id
    fetch(`http://localhost:3002/memes/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((meme) => {
        console.log(meme);
        //set the meme
        setMemeFromServer(meme);
      });
  }; 

   //get the memes from the server to move through the array
  const getMemes = (event) => {
    fetch("http://localhost:3002/memes", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((memes) => {
      //set the memes
       setMemesFromServer(memes); // set the state of memesfromServer to the received memes
       //set current id to find current array index to go through
       setCurrentId(id);
       const currentMemeIndex = memes.findIndex(meme => meme._id === id);
       // set nextId to the id of the next meme
       setNextId(memes[currentMemeIndex + 1]?._id);
      // set prevId to the id of the next meme
       setPrevId(memes[currentMemeIndex - 1]?._id);
      });
  };

  useEffect(() => {
    const filteredMemes = memesfromServer.filter(memefromServer => memefromServer.title.toLowerCase().includes(searchValue.toLowerCase()));
    setMemesFromServer(filteredMemes);
    if (id !== null) {
      getMeme(); // call the function to get the memes from the server
      getMemes();
      console.log(id);
    }
    if (!autoplay) return; // if autoplay is not set, do not run the effect
    const intervalId = setInterval(() => {
      nextMemeId();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [id, autoplay, nextId]);


const nextMemeId = () => {
  //define the current meme by finding the meme from the array by id and setting the "currentid"
  const currentMeme = memesfromServer.find((meme) => meme._id === currentId);
  //get back the current index of the currentMeme
const currentIndex = memesfromServer.indexOf(currentMeme);

  //go to the nextIndex 
  const nextIndex = currentIndex+1;
  //set the next index
 // setNextId(notNullMemes[nextIndex]._id);
  //navigate to the next id
  navigate(`/memes/${nextId}`);
  //const nextMeme = notNullMemes[nextIndex];
}

const prevMemeId = () => {

   //define the current meme by finding the meme from the array by id and setting the "currentid"
   const currentMeme = memesfromServer.find((meme) => meme._id === currentId);
   //get back the current index of the currentMeme
 const currentIndex = memesfromServer.indexOf(currentMeme);
  //go to the nextIndex 
   const prevIndex = currentIndex+1;
   //set the next index
   //navigate to the next id
   navigate(`/memes/${prevId}`);
   //const nextMeme = notNullMemes[nextIndex];
}
  const getRandomId = async () => {
    const response = await fetch("http://localhost:3002/memes");
    const memes = await response.json();
    const ids = memes.map((meme) => meme._id);
    const randomIndex = Math.floor(Math.random() * ids.length);
    return ids[randomIndex];
  };

  const showRandom = async () => {
    const randomId = await getRandomId();
    window.location.href = `/memes/${randomId}`;
  };

const handleAutoplay = () => {
  setAutoplay(!autoplay);
}

  const steps = [
    {
      label: memefromServer.title,
      imgPath: memefromServer.image_encoded,
    }
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

const handleStopInterval = () => {
  setAutoplay(!autoplay);
  clearInterval(intervalId);
  
};

  return (
    <div>
      <Grid
        container
        spacing={2}
        paddingLeft={30}
        paddingTop={10}
        paddingRight={30}
      >
        <Grid item md={8}>
          <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
              }}
            >
               </Paper>
            <Box
              style={{ width: "600px" }}
              md={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}
            >
              <img
                src={steps[activeStep].imgPath}
                alt={steps[activeStep].label}
                style={{
                  display: "block",
                  maxWidth: 1000,
                  width: "100%",
                  overflow: "hidden",
                }}
              />
            </Box>
         <MobileStepper
         variant="none"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={() => {
                    setCurrentId(nextId);
                    nextMemeId();
                  }}
                 // disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
                  }
              backButton={
                <Button
                  size="small"
                  onClick={() => {
                    setCurrentId(prevId);
                    prevMemeId();
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
          <Button
            variant="contained"
            onClick={showRandom}
            style={{ margin: 10 }}
          >
            Random meme
          </Button>
        
          <Button variant="contained"
           onClick={handleAutoplay}>
            Start Autoplay ▶
          </Button>
          <Button
            variant="contained"
            onClick={handleStopInterval} style={{ margin: 10 }}
          >
            Stop Autoplay ||
          </Button>
        </Grid>
        <Grid item md={4}>
       
          <h1>{memefromServer.title}</h1>
          <h2> Likes: {memefromServer.likes} </h2> <br />
          <Link to="/editor">
            <Button variant="contained">Edit this template</Button>
          </Link>
          <h2> Comments: </h2>
          {/*} Code for Mapping Comments later on
              <div>
              {comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
              ))}
              </div>*/}
          You need to login to comment. Sign in <Link to="/signin"> here </Link>{" "}
          <br />
          {/*   <Comments/>**/}
          <TextareaValidator />
          {/*} style={{paddingBottom: 30}}
              id="newComment"
              label="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            onSubmit={handleCommentSubmit}*/}
        </Grid>
      </Grid>
    </div>
  );
}
