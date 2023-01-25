import React, { useState, useEffect } from "react";
import base64 from 'base64-js';


const MemeLukasOriginal = (props) => {
    const { meme } = props;
    const [imageSrc, setImageSrc] = useState("");
    const [text, setText] = useState(`Title: ${meme.title} Image Description ${meme.imageDescription} Status: ${meme.status} Likes: ${meme.likes} Created: ${meme.memeCreated} Creator ID: ${meme.CreatorID} Creator Email: ${meme.CreatorMail}`); // is read out by the voice in this order and only this variables

    // decode Image 
    useEffect(() => {
        
      /*  const data = base64.decode(meme.image_encoded.split(',')[1]);*/
        const data = atob(meme.image_encoded.split(',')[1]);
        const buffer = new ArrayBuffer(data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < data.length; i++) {
            view[i] = data.charCodeAt(i);
        }
        const blob = new Blob([view], { type: 'image/jpeg' });
        setImageSrc(URL.createObjectURL(blob));
    }, [meme.image_encoded]);

    function handleSpeakClick() {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    return (
        <div>
            <h2>{meme.title}</h2>
            <p>imageDecription: {meme.imageDescription}</p>
            <p>Status: {meme.status}</p>
            <p>Likes: {meme.likes}</p>
            <p>Created: {meme.memeCreated}</p>
            <p>Creator ID: {meme.CreatorID}</p>
            <p>Creator Email: {meme.CreatorMail}</p>
            
            <img src={imageSrc} alt={meme.title} />
            <button onClick={handleSpeakClick}>Speak</button>
        </div>

    );
};

export default MemeLukasOriginal;
