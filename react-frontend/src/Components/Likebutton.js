import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const LikeButton = (props) => {
  const [likes, setLikes] = useState(props.meme.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [memeId, setMemeId] = useState(props.meme.id); 

  useEffect(() => {
   // setMemeId(props.meme.id);
    setMemeId(props.meme.id);
  /*  getMeme();*/
    
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
    fetch(`http://localhost:3002/memes/${props.meme._id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        $inc: {likes: isLiked? -1 : 1},
        $set: {isLiked : !isLiked}
        //$inc: {likes: isLiked ? -1 : 1}
      /*  {likes: 
            isLiked ? 0 : +1 } }*/
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       // setLikes(data.likes);
        setLikes(likes + (isLiked? -1 : 1));
        setIsLiked(!isLiked);
        //setLikes(likes);
       // isLiked? 
        //setLikes(likes-1) :
       // setLikes(likes+1);
      })
      .catch((error) => 
      console.error(error));
  };

  const handleClick = () => {
  //  setLikes(isLiked ? props.meme.likes - 1 : props.meme.likes + 1);
   // setIsLiked(!isLiked);
   //updateLikes(memeId);

  // updateLikes(id);
  /*  if (isLiked) {
    setLikes(likes - 1);
    setIsLiked(!isLiked);
    } else {
    setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
   // updateLikes(props.meme.id);
   updateLikes(memeId);
    };*/
}
  
   
    
  return (
    <div>
         <CardContent>
          <Typography variant="body2" color="text.secondary">
          <b>
          {/*{props.likes} */}
          {/*{props.meme.likes} */} 
          {likes}  {likes === 1 || likes === -1 ? "Like" : "Likes"}
</b>

         </Typography>
      <IconButton 
      style={{ color: isLiked ? 'green' : 'gray' }}
        onClick={() => {
          //handleClick(); 
         // updateLikes(props.meme.id);
         //updateLikes(props.meme._id, props.likes + 1);
         updateLikes(props.meme._id, props.likes);
         //setLikes(likes);
         
        }}>
        {/*{isLiked ? <ThumbDownIcon/> : <ThumbUpIcon/>}*/}
        <ThumbUpIcon/>
      </IconButton>
      </CardContent>
    </div>
  );
};

export default LikeButton;