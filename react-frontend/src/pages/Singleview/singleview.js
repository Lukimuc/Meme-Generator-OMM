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
import { Meme } from "../Home/Meme";
/*import {Likes} from '../Components/likes';*/
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import TextareaValidator from "../../Components/TextareaValidator.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Singleview() {
  //getting String
  const location = useLocation();
  const linkURL = location.pathname;
  const [, id] = linkURL.split("/memes/");
  const [memesfromServer, setMemesFromServer] = useState([]);
  const [currentId, setCurrentId] = useState(id);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const navigate = useNavigate();
  const [autoplay, setAutoplay] = useState(false);

const [intervalId, setIntervalId] = useState(null);

  console.log(id); // Output: "63c9c134f5f20d30d87b6da7"
  const [memefromServer, setMemeFromServer] = useState([]);

  const notNullMemes = memesfromServer.filter((meme) => meme._id !== null);
  const getMeme = (event) => {
    //meme._id
    fetch(`http://localhost:3002/memes/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((meme) => {
        console.log(meme);
        setMemeFromServer(meme);
      });
  }; //{console.log(memeId)}

  const getMemes = (event) => {
    fetch("http://localhost:3002/memes", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((memes) => {
        setMemesFromServer(memes); // set the state of memesfromServer to the received memes
        setCurrentId(memes[0]._id);
      });
  };

  const nextMemeId = () => {
    const currentIndex = memesfromServer.findIndex((meme) => meme._id === currentId);
    const nextIndex = currentIndex + 1;
   // setNextId(memesfromServer[nextIndex]._id);
   navigate(`/memes/${nextId}`);
    if(nextIndex > memesfromServer.length -1) nextIndex = 0;
    setNextId(notNullMemes[nextIndex]._id);
  }
  
  const prevMemeId = () => {
    const currentIndex = memesfromServer.findIndex((meme) => meme._id === currentId);
    const prevIndex = (currentIndex - 1);
  //  const prevIndex = (currentIndex - 1 + memesfromServer.length) % memesfromServer.length;
  //  setPrevId(memesfromServer[prevIndex]._id);

    if(prevIndex < 0) prevIndex = memesfromServer.length -1;
    setPrevId(memesfromServer[prevIndex]._id);
  }
  useEffect(() => {
    fetch(`http://localhost:3002/memes/${id}`)
      .then((response) => response.json())
      .then((meme) => {
        setMemeFromServer(meme);
      });
  }, [id]);

  useEffect(() => {
    //  setMemeId(memeId);
    getMeme(); // call the function to get the memes from the server
    getMemes();
 /*   if(autoplay) {
      const id = setInterval(handleNextClick, 5000);
      setIntervalId(id);
  }return () => {
    clearInterval(intervalId);*/
}, [])


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

  const handleNextClick = () => {
    navigate(`/memes/${nextId}`);
    setCurrentId(nextId);
    nextMemeId();
    prevMemeId();
}

const handleAutoplay = () => {
  setAutoplay(!autoplay);
}

  const steps = [
    {
      label: memefromServer.title,
      imgPath: memefromServer.image_encoded,
    }
    /*{
      label: "Templatename 2",
      imgPath:
        "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Templatename3",
      imgPath:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    },*/
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    const currentIndex = memesfromServer.findIndex((meme) => id === currentId);
    setNextId(memesfromServer[currentIndex + 1].id);
    setCurrentId(nextId);
    setActiveStep((prevActiveStep) =>
      prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    const currentIndex = memesfromServer.findIndex((meme) => id === currentId);
    setNextId(memesfromServer[currentIndex - 1].id);
    setCurrentId(prevId);
    setActiveStep((prevActiveStep) =>
      prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep - 1
    );
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  /*
  setInterval(function(){
    navigate(`/memes/${nextId}`);
    setCurrentId(nextId);
    nextMemeId();
}, 4000);*/

const handleStartInterval = () => {
  setIntervalId(setInterval(() => {
    navigate(`/memes/${nextId}`);
    setCurrentId(nextId);
    nextMemeId();
  }, 4000));
};

const handleStopInterval = () => {
  clearInterval(intervalId);
};

  /* useEffect(() => {
      setInterval(handleNext, 5000)
    }, [])*/

    const changeId = (direction) => {
      if (direction === 'next') {
          setCurrentId(nextId);
      } else {
          setCurrentId(prevId);
      }
  }
  return (
    <div>
      <Grid
        container
        spacing={2}
        paddingLeft={30}
        paddingTop={10}
        paddingRight={30}
        style={{}}
      >
        <Grid item md={8}>
          {/*} <h1> Meme ID - gelesen aus URL: {id}</h1>*/}
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
             {/*} <Typography>{steps[activeStep].label}</Typography>*/}
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
                <Link to={`/memes/${nextId}`}>
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
                </Link>
                  }
              backButton={
                <Link to={`/memes/${prevId}`}>
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
                </Link>
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
           onClick={handleStartInterval}>
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
