import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MemeLukas from '../pages/TestLukas/MemeLukas';


const LikeButton = (props) => {
  const [likes, setLikes] = useState(props.meme.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [memeId, setMemeId] = useState(props.meme.id); 

  useEffect(() => {
   // setMemeId(props.meme.id);
    setMemeId(props.meme.id);
  /*  getMeme();*/
  /*if (props.isSignedIn === true) {
    if (props.likedBy.includes(!props.user.email)) {
      document.getElementById("likebutton").style.color='green';
    }*/
   /* if(!likedBy.find(email => email === props.user.email)) {
      document.getElementById("likebutton").style.color='green';
  }*/
/*if (props.isSignedIn === true) {
    if (props.meme.likedBy.includes(props.user.email)) {
      document.getElementById("likebutton").style.color='green';
    }
  }*/
    
  }, [props.meme]);
  
  const location = useLocation();
  const linkURL = location.pathname;
  const [,id] = linkURL.split("/memes/");
   /* const setLikeState = () => {
    if (isLiked) {
      setLiked(!liked);
      setLikes(likes - 1);
    }
    if (!Liked) {
      setLiked(liked);
      setLikes(likes + 1);
    }*/

    /*
  const getMeme = (event) => {
    fetch(`http://localhost:3002/memes/${memeId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(meme => {
        console.log(meme);
      })
  }*/

  {/*}
  const updateLikes = (id) => { //meme._id
    console.log(id);
    fetch(`http://localhost:3002/memes/${id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 
      body: JSON.stringify({likes: likes + 1}) }
     
    })
      .then(response => response.json())
     .then(data => {
     setLikes(data.likes);
      })
      .catch(error => console.error(error));
  } */}
  
  const updateLikes = (id) => {
    setIsLiked(!isLiked);
    if (props.isSignedIn === true) {
   // if (props.isSignedIn === true) {
    fetch(`http://localhost:3002/memes/${props.meme._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        likes: props.meme.likes + 1,
      
       // likedBy: props.user.email
        
        //deleteLike: true
        //$inc: {likes: isLiked ? -1 : 1}
      /*  {likes: 
            isLiked ? 0 : +1 } }*/
      }),
    })
      .then((res) => res.json())
      .then((updatedMeme) => {
        setLikes(updatedMeme.likes);
       // props.likedBy(props.use.email)
       // setLikes(likes + (isLiked? -1 : 1));
        //setIsLiked(!isLiked);
        //setLikes(likes);
       // isLiked? 
        //setLikes(likes-1) :
       // setLikes(likes+1);
      })
      .catch((error) => 
      console.error(error));
   //}
  }};

  const updateDislikes = (id) => {
    setIsLiked(!isLiked);
    if (props.isSignedIn === true) {
   // if (props.isSignedIn === true) {
    fetch(`http://localhost:3002/memes/${props.meme._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        likes: likes - 1,
       // likedBy: props.user.email
       // deleteLike: props.true
        //$inc: {likes: isLiked ? -1 : 1}
      /*  {likes: 
            isLiked ? 0 : +1 } }*/
      }),
    })
      .then((res) => res.json())
      .then((updatedMeme) => {
        
        setLikes(updatedMeme.likes);

      /*  if (props.isSignedIn === true) {
          if (props.likedBy.includes(!props.user.email)) {
            document.getElementById("likebutton").style.color='green';
          }
        }*/
       // setLikes(likes + (isLiked? -1 : 1));
        //setIsLiked(!isLiked);
        //setLikes(likes);
       // isLiked? 
        //setLikes(likes-1) :
       // setLikes(likes+1);
       
      })
      .catch((error) => 
      console.error(error));
   //}
  }};

 


  return (
    <div>
         <CardContent>
          <Typography variant="body2" color="text.secondary">
          <b>
          {/*{props.likes} */}
          {/*{props.meme.likes} */} 
          {likes}  {likes === 1 || likes === -1 ? "Like" : "Likes"}
</b>{props.meme.likes}

{/*{props.user.email}*/}
         </Typography>
      <IconButton id="likebutton"
      style={{ color: isLiked ? 'green' : 'gray' }}
        onClick={() => { isLiked ?
         updateDislikes(props.meme._id, props.likes) :
         updateLikes(props.meme._id, props.likes);
        }}>
          
        {/*{isLiked ? <ThumbDownIcon/> : <ThumbUpIcon/>}*/}
        <ThumbUpIcon/>
      </IconButton>
      </CardContent>
    </div>
  );
};

export default LikeButton;