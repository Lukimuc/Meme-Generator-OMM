import React from "react";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Graph imports
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// Video Stream Imports
import io from 'socket.io-client';
import html2canvas from 'html2canvas';
const socket = io('https://localhost:8080', {
  rejectUnauthorized: false
});

export function Singleview(props) {
  // Video Stream States
  const [message, setMessage] = useState("Streaming: OFF");
  const [streaming, setStreaming] = useState(false);
  const sectionRef = useRef(null);

  // VoiceControl States
  const [isRecording, setIsRecording] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [transcript, setTranscript] = useState("");
  const [textFieldText, setTextFieldText] = useState("");
  const [playback, setPlayback] = useState(false);
  const [isTextFieldSelected, setIsTextFieldSelected] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

  // Graph States
  const [todayViews, setTodayViews] = useState(0);
  const fetchRef = useRef(false);
  const [data, setData] = useState([ // We simulate past data with static but have individual today graphs for each meme
    { name: 'Three Days ago', pageViews: 7 },
    { name: 'Two Days ago', pageViews: 13 },
    { name: 'Yesterday', pageViews: 5 },
    { name: 'Today', pageViews: todayViews },
  ]);

  //getting String
  const location = useLocation();
  const linkURL = location.pathname;
  const [, id] = linkURL.split("/memes/");

  //for slideshow
  const [memesfromServer, setMemesFromServer] = useState([]);
  const [memefromServer, setMemeFromServer] = useState([]);
  const [currentId, setCurrentId] = useState(id);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const navigate = useNavigate();

  //for autoplay
  const [autoplay, setAutoplay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const notNullMemes = memesfromServer.filter((meme) => meme._id !== null);
  const getMeme = (event) => {
    fetch(`http://localhost:3002/memes/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((meme) => {
        console.log(meme);
        setMemeFromServer(meme);
      });
  }; 

  const getMemes = (event) => {
    fetch("http://localhost:3002/memes", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((memes) => {
        setMemesFromServer(memes); // set the state of memesfromServer to the received memes
        setCurrentId(id);

        //find the index of the current meme
        const currentMemeIndex = memes.findIndex(meme => meme._id === id);
        
        // set nextId to the id of the next meme
        setNextId(memes[currentMemeIndex + 1]?._id);

        // set prevId to the id of the next meme
        setPrevId(memes[currentMemeIndex - 1]?._id);
      });
  };

  const nextMemeId = () => {
    //define the current meme by finding the meme from the array by id and setting the "currentid"
    const currentMeme = memesfromServer.find((meme) => meme._id === currentId);
    //get back the current index of the currentMeme
    const currentIndex = memesfromServer.indexOf(currentMeme);

    //go to the nextIndex 
    const nextIndex = currentIndex + 1;

    //navigate to the next id
    navigate(`/memes/${nextId}`);

  }

  const prevMemeId = () => {
    //define the current meme by finding the meme from the array by id and setting the "currentid"
    const currentMeme = memesfromServer.find((meme) => meme._id === currentId);
    //get back the current index of the currentMeme
    const currentIndex = memesfromServer.indexOf(currentMeme);
    //updating current index with next ID
    const prevIndex = currentIndex + 1;
    //set the next index
   
    //navigate to the next id
    navigate(`/memes/${prevId}`);
  }

  useEffect(() => {
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

  
  // Voice Control Effect
  useEffect(() => {
    if (buttonClicked === "Next") {
      navigate(`/memes/${nextId}`);
      setButtonClicked(null) // reset state
      setTranscript("")
    }

    if (buttonClicked === "Play") {
      handleAutoplay();
      setButtonClicked(null) // reset state
    }


    if (buttonClicked === "Random") {
   
    showRandom();
      setButtonClicked(null) // reset state
    }

    if (buttonClicked === "Back") {
      setCurrentId(prevId);
      prevMemeId();
     setButtonClicked(null) // reset state
    }
  }
  )


  // Videostream Code
  useEffect(() => {
    if (!streaming) return;
    const intervalId = setInterval(() => {
      html2canvas(sectionRef.current).then(canvas => {
        socket.emit("streaming", canvas.toDataURL("image/webp"));
      });
    }, 40);

    return () => {
      clearInterval(intervalId);
    };
  }, [streaming]);

  const startStream = () => {
    setMessage("Streaming: ON");
    setStreaming(true);
  };

  const stopStream = () => {
    setMessage("Streaming: OFF");
    setStreaming(false);
  };

  // Voice Control Function
  const startRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      recognition.abort();
    } else {
      recognition.start();
      recognition.onresult = event => {
        let current = event.resultIndex;
        let newTranscript = event.results[current][0].transcript.toLowerCase();
        if (isTextFieldSelected) {
          setTranscript(newTranscript);
        } else {
          setTranscript(transcript + " " + newTranscript);
        }
        if (newTranscript === "back" || newTranscript === " back") {
          setButtonClicked("Back");
        } else if (newTranscript === "pause" || newTranscript === "play" || newTranscript === " play" || newTranscript === " pause") {
          setPlayback(!playback);
          setButtonClicked(newTranscript);
        } else if (newTranscript === "next" || newTranscript === " next") {
          setButtonClicked("Next");
        } else if (newTranscript === "random" || newTranscript === "random meme" || newTranscript === "zufällig" || newTranscript === " random meme" || newTranscript === " random" || newTranscript === " zufällig") {
          setButtonClicked("Random");
        } else if (newTranscript === "select" || newTranscript === " select") {
          setIsTextFieldSelected(true);
        } else if (newTranscript === "like" || newTranscript === " like") {
          setIsTextFieldSelected(true);
        } else if (newTranscript === "deselect" || newTranscript === " deselect" || newTranscript === " die select") {
          setIsTextFieldSelected(false);
          setTextFieldText(transcript);
        }
      };
    }
  }

  // Graph Render
  useEffect(() => {
    fetchInitialData();
  }, [fetchRef]);

  async function fetchInitialData() {
    // fetch data from server
    await fetch(`http://localhost:3002/memes/${id}`)
      .then(response => response.json())
      .then(initialMeme => {
        const updatedData = [...data];
        updatedData[3].pageViews = initialMeme.viewsToday;
        setTodayViews(initialMeme.viewsToday);
        setData(updatedData);
        updateData();
      }).catch(error => {
        console.log(error)
      });
  }

  async function updateData() {
    // increment the page views for today
    const updatedData = [...data];
    updatedData[3].pageViews += 1;

    // send data to server
    await fetch(`http://localhost:3002/memes/${id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        viewsToday: updatedData[3].pageViews
      })
    })
      .then(response => response.json())
      .then(updatedMeme => {
        setTodayViews(updatedMeme.viewsToday)
        setData(updatedData)
      }).catch(error => {
        console.log(error)
      });
  }

  //random ID
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

  //setAutoplay
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

  const changeId = (direction) => {
    if (direction === 'next') {
      setCurrentId(nextId);
    } else {
      setCurrentId(prevId);
    }
  }
  let currentIndex = memesfromServer.findIndex(meme => meme._id === currentId);
  return (
    <div ref={sectionRef}>
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
                      setButtonClicked("Next") // For Voice Control
                    }}
                    disabled={currentIndex === memesfromServer.length - 1}
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
                    disabled={currentIndex === 0}
                    size="small"
                    onClick={() => {
                      setCurrentId(prevId);
                      prevMemeId();
                      setButtonClicked("Back") // For Voice Control
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
              onClick={() => {
                showRandom();
                setButtonClicked("Random")
              }}
              style={{ margin: 10 }}
            >
              Random meme
            </Button>

            <Button variant="contained"
              onClick={() => {
                handleAutoplay();
                setButtonClicked("Play");
              }}>
              Start Autoplay ▶
            </Button>

            <Button
              variant="contained"
              onClick={handleStopInterval} style={{ margin: 10 }}
            >
              Stop Autoplay ||
            </Button>

            <div>
              {/*} <Likebutton key={memefromServer._id} meme={memefromServer} id={id} isSignedIn={props.isSignedIn} user={props.user} email={props.email} likes={props.likes} likedBy={props.likedBy}  /*updateMeme={updateMeme}>Like</Likebutton>*/}

              <h3>Voice Control</h3>
              <button onClick={startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button><br></br>
              <b>Transcript</b> <i>{transcript}</i>
              <p><b>Activate Recording and use these Commands </b><br></br> "Play" to start the Slideshow <br></br> "Pause" to pause the Slideshow <br></br> "Next" or "Back" to move forward or backwards <br></br> "Select" to select the Textfield on the bottom, then say anything you want</p>

              Voice Textinput field:   <input
                type="text"
                onFocus={() => setIsTextFieldSelected(true)}
                onBlur={() => {
                  setIsTextFieldSelected(false);
                  setTextFieldText(transcript);
                }
                }
                value={isTextFieldSelected ? transcript : textFieldText}
                style={isTextFieldSelected ? { borderColor: "blue" } : {}}
              />
              <div>Button clicked via voice: {buttonClicked} </div>
            </div>

            <h2>Dynamic views graph</h2>
            <LineChart width={600} height={300} data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line dataKey="pageViews" fill="#1976d2" barSize={30} />
              <Tooltip />
            </LineChart>

          </Grid>
          <Grid item md={4}>
            <h2> Details </h2>
            <p> <b>Title</b><br></br> {memefromServer.title} </p>
            <p> <b>Creation date</b> <br></br> {memefromServer.memeCreated} </p>
            <p> <b>CreatorMail </b><br></br>{memefromServer.CreatorMail} </p>
            <p> <b>imageDescription</b> <br></br>{memefromServer.imageDescription} </p>
            <p> <b>Likes  <br></br></b>{memefromServer.likes} </p> <br />
            
            <div>
              <h2>Livestream this view</h2>
              <button onClick={startStream} disabled={streaming}>Start streaming</button>
              <button onClick={stopStream} disabled={!streaming}>Stop streaming</button>
              <br></br>
              <p>{message}</p>
              <a href="http://localhost:3000/viewer" target="_blank">Click this to see the crypted https / websocket videostream in a second tab or use http://localhost:PORT/viewer</a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}