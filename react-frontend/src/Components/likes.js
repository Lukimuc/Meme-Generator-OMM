import React from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export const Likes = ({ count, handleLike }) => {
  return (
    <IconButton aria-label="like" onClick={handleLike}>
      <ThumbUpIcon style={{ color: count > 0 ? 'green' : 'gray' }} />
    </IconButton>
  )
}
/*
export default Likes;*/