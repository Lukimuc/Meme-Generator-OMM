import React, { useState, useEffect } from "react";

const MemeLukas = (props) => {
    const { meme } = props;
    const [imageSrc, setImageSrc] = useState("");


    // decode Image 
    useEffect(() => {
        const data = atob(meme.image_encoded.split(',')[1]);
        const buffer = new ArrayBuffer(data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < data.length; i++) {
            view[i] = data.charCodeAt(i);
        }
        const blob = new Blob([view], { type: 'image/jpeg' });
        setImageSrc(URL.createObjectURL(blob));
    }, [meme.image_encoded]);

    return (
        <div>
            <h2>{meme.title}</h2>
            <p>Status: {meme.status}</p>
            <p>Likes: {meme.likes}</p>
            <p>Created: {meme.memeCreated}</p>
            <p>Creator ID: {meme.CreatorID}</p>
            <p>Creator Email: {meme.CreatorMail}</p>
            <img src={imageSrc} alt={meme.title} />
        </div>
    );
};

export default MemeLukas;
