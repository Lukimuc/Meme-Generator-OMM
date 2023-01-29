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
  const [likedBy, setlikedBy] = useState(props.meme.likedBy);
  const [deleteLike, setDeleteLike] = useState(props.meme.deleteLike);

  let userAlreadyLiked = false;

  useEffect(() => {
   // setMemeId(props.meme.id);
    setMemeId(props.meme.id);
   // updateLikedBy(id);
    
   // updateLikedBy();
    //updateLikes(props.meme.likes);
   // setLikes(likes);
   // setlikedBy(likedBy);
    if (props.isSignedIn === true) {
     /* setLikes(likes);
      setlikedBy(likedBy);*/
//if (!props.meme.likedBy.find(email => email === props.user.email)) {
 /* document.getElementsByClassName("likebutton")[0].style.color = 'green';*/
  //  document.getElementsByClassName("likebutton").style.color = 'green';
//}
    } 
  }, [props.meme._id, props.user, likedBy, likes]);
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
 /* if (props.isSignedIn === true && props.meme.likedBy.includes(props.user.email)) {
    document.getElementById("likebutton").style.color = 'green';
}*/

const updateLikedBy = (id) => {
 // setIsLiked(!isLiked);
  if (props.isSignedIn === true) {
    //if meme doesn't have the user in the array, do +1
    if(!likedBy.find(email => email === props.user.email)) {
   // if (!props.meme.likedBy.includes(props.user.email)) {
    userAlreadyLiked = true;
   console.log(props.user.email);
      console.log(props.meme.likedBy)
 // if (props.isSignedIn === true) {
  fetch(`http://localhost:3002/memes/${props.meme._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
     likedBy: props.user.email
    }),
  })
    .then((res) => res.json())
    .then((updatedMeme) => {
      setlikedBy(updatedMeme.likedBy);
    //  console.log(likedBy[0]);
      console.log(updatedMeme);
    })
    .catch((error) => 
    console.error(error));
  }
  else {
    fetch(`http://localhost:3002/memes/${props.meme._id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
  //likedBy: props.user.email,//props.user.likedBy, //- props.user.email
  //deleteLike: true

  likedBy: props.user.email,
  deleteLike: true
  }),})
  .then((res) => res.json())
  .then((updatedMeme) => {
    setlikedBy(updatedMeme.likedBy);
    console.log(likedBy);
  })
  .catch((error) => 
  console.error(error));
  }
  
 //}
 /*
 if (userAlreadyLiked = true && props.isSignedIn === true) {
  userAlreadyLiked = false;
  console.log("remove user with likedBy and deleteLike");
fetch(`http://localhost:3002/memes/${props.meme._id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    likedBy: props.user.email,//props.user.likedBy, //- props.user.email
  deleteLike: true
  }),})
  .then((res) => res.json())
  .then((updatedMeme) => {
    setlikedBy(updatedMeme.likedBy);
    console.log(likedBy);
  })
  .catch((error) => 
  console.error(error));
}*/
}
};

  const updateLikes = (id) => {
    
   // setIsLiked(!isLiked);
    if (props.isSignedIn === true) {
      //if meme doesn't have the user in the array, do +1
      if(!likedBy.find(email => email === props.user.email)) {
        userAlreadyLiked = true;
        // if (!props.meme.likedBy.includes(props.user.email)) {
        console.log(props.user.email);
        console.log(props.meme.likedBy)
   // if (props.isSignedIn === true) {
    fetch(`http://localhost:3002/memes/${props.meme._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        //likedBy: props.user.email,
      //  id: props.meme.id, // likes: props.meme.likes + 1,   // likedBy: props.user.email         //$inc: {likes: isLiked ? -1 : 1}
        likes: props.meme.likes + 1
      }),
    })
      .then((res) => res.json(console.log(props.meme.likedBy)))
      .then((updatedMeme) => {
        setLikes(updatedMeme.likes);
      })
      .catch((error) => 
      console.error(error));
    }
   //}
  else {
    console.log("remove likes with functionality");
  fetch(`http://localhost:3002/memes/${props.meme._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
    likedBy: props.user.email,
    likes: props.meme.likes,
    deleteLike: true
    }),
  })
    .then((res) => res.json())
    .then((updatedMeme) => {
      setlikedBy(updatedMeme.likedBy);
      setLikes(updatedMeme.likes);
     setDeleteLike(updatedMeme.deleteLike);
    })
    .catch((error) => 
    console.error(error));
  }
}    
};
  return (
    <div>
         <CardContent>
          <Typography variant="body2" color="text.secondary">
          {/*Liked by: {likedBy}*/}
          <b>
          {/*{props.likes} */}
          {/*{props.meme.likes} */} 
           {likes} {likes === 1 ?  "Like" : "Likes"}
         
</b>
         </Typography>
      <IconButton className="likebutton" 
    //  style={{ color: isLiked ? 'green' : 'gray' }}
        onClick={() => {
          updateLikedBy(props.meme._id,  props.meme.likes, props.meme.likedBy, props.user.email);
        
          updateLikes(props.meme._id, props.meme.likes, props.meme.likedBy, props.user.email);
          /*isLiked ?
         updateDislikes(props.meme._id, props.likes) :
         updateLikes(props.meme._id, props.likes, props.user.email);*/
        }}>
          
        {/*{isLiked ? <ThumbDownIcon/> : <ThumbUpIcon/>}*/}
        <ThumbUpIcon/>
      </IconButton>
      </CardContent>
    </div>
  );
};
export default LikeButton;