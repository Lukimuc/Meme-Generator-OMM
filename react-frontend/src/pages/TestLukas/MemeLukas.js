import React, { useState, useEffect } from "react";


const MemeLukas = (props) => {
    const { meme } = props;
    const [imageSrc, setImageSrc] = useState("");
    const [text, setText] = useState(`Title: ${meme.title} Image Description ${meme.imageDescription} Status: ${meme.status} Likes: ${meme.likes} Created: ${meme.memeCreated} Creator ID: ${meme.CreatorID} Creator Email: ${meme.CreatorMail}`); // is read out by the voice in this order and only this variables

    // draft mode
    const [editMode, setEditMode] = useState();
    const [title, setTitle] = useState(meme.title);
    const [imageDescription, setImageDescription] = useState(meme.imageDescription);
    const [status, setStatus] = useState(meme.status);


    // check if it's a draft and store it in a variable for the render
    var draft = false;
    if (meme.status === 'draft') {
        draft = true
    }


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

    function handleSpeakClick() {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleToggleStatus() {
        if (status === 'private') {
            setStatus('public');
            fetch(`http://localhost:3002/memes/${meme._id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: "public"
                })
            })
                .then(response => response.json())
                .then(updatedMeme => {
                    console.log(updatedMeme);
                    setStatus(updatedMeme.status);
                });
        }

        if (status === 'public') {
            setStatus('private');
            fetch(`http://localhost:3002/memes/${meme._id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: "private"
                })
            })
                .then(response => response.json())
                .then(updatedMeme => {
                    console.log(updatedMeme);
                    setStatus(updatedMeme.status);
                });
        }
    }

    function saveDraft() {
        console.log(meme._id)
        fetch(`http://localhost:3002/memes/${meme._id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                status: status,
                imageDescription: imageDescription
            })
        })
            .then(response => response.json())
            .then(updatedMeme => {
                setTitle(updatedMeme.title);
                setImageDescription(updatedMeme.imageDescription);
                setStatus(updatedMeme.status);
            });
    }


    return (
        <>
            <div>
                <h2>{title}</h2>
                <p>imageDecription: {imageDescription}</p>
                <p>Status: {status}</p>
                <p>Likes: {meme.likes}</p>
                <p>Created: {meme.memeCreated}</p>
                <p>Creator ID: {meme.CreatorID}</p>
                <p>Creator Email: {meme.CreatorMail}</p>
                <img src={imageSrc} alt={meme.title} />

                {draft ?
                    <button onClick={handleEditMode}>Edit Draft</button>
                    : <p></p>}
                <button onClick={handleToggleStatus}>{status === 'private' ? 'Make Public' : 'Make Private'}</button>
                <button onClick={handleSpeakClick}>Text to Speech</button>
            </div>

            {editMode === true ?
                <div>
                    Draft Mode
                    <p>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </p>
                    <p>
                        Image Description:
                        <input
                            type="text"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                        />
                    </p>
                    <p>
                        Status (there's private, draft, public):
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </p>

                    <button onClick={saveDraft}>Save</button>
                </div>
                : <p></p>}

        </>


    );
};

export default MemeLukas;
