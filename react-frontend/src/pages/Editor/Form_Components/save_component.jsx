import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

import { TextField, Button, RadioGroup, FormControlLabel, Radio, Link } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Share from "./shares"



function Save_Form({ stageRef, user }) {

  const [maxSize, setMaxSize] = useState(1);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedOption, setSelectedOption] = useState("private");
  const [sharedUrl, setSharedUrl] = useState("")

  const save_Element = (blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed_image.jpg";
    link.click();

  }

  const handleSave = async() => {
    if (user.email === ""){
      toast.error("Kein User angemeldet")
      return
    }
    if (!stageRef.current) {
        console.log("Stageref ist null")
        return;
    }
    const stage = stageRef.current;
    let dataURL = stage.toDataURL({
        mimeType: 'image/jpg',
    });

    let blob = dataURLtoBlob(dataURL);
    if (blob.size < maxSize * 1000){
      save_Element(blob)
    }


    console.log("Ab hier gehts los!")
    console.log(blob.size)

    let size = 0.5

    let options = {
      maxSizeMB: size,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      resizeMode: "force",
      fileType: 'image/jpeg'
  }
  try {
      let saved = false
      let compressedFile = await imageCompression(blob, options);
      if (compressedFile.size < maxSize * 1000){
        save_Element(blob)
      }
      for (let j = 0; j < 20 ; j++) {
        let compressedFile = await imageCompression(blob, options);
        for (let i = 0 ; i < 5; i++){
          compressedFile = await imageCompression(compressedFile, options);
          if (compressedFile.size < maxSize * 1000){
            save_Element(compressedFile)
            saved = true
            break;
          }
        }
        if (saved){
          break
        }
       
        size = size * 0.5
        options = {
          maxSizeMB: size,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          resizeMode: "force",
          fileType: 'image/jpeg'
        }
      }

  console.log("Die Datei konnte nicht abgespeichert werden sie nicht so klein komprimiert werden konnte!")
      
  } catch (error) {
      console.log(error);
  }
  };

  const dataURLtoBlob = (dataURL) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURL.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

  const sendtoServer = () => {
    if (user.email === ""){
      toast.error("Kein User angemeldet")
      return
    }
    if (!stageRef.current) {
      console.log("Stageref ist null")
      return;
    }
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({
      mimeType: 'image/png',
      quality: 1
    });
    if (title === "" || description === "") {
      toast.error('Title oder Description wurde nicht hinzugefügt');
      return
    }
    createMeme(dataURL)
  }

  const createMeme = (image) => {
    fetch('http://localhost:3002/memes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        imageDescription: description,
        status: selectedOption,
        email: user.email, 
        image_encoded: image
      })
    })
      .then(response => {
        if (response.ok) {
          toast.success("Das Meme wurde erstellt");
        } else {
          toast.error("Fehler beim Erstellen des Memes");
        }
        return response.json();
      })
      .then(createdMeme => {
        console.log(createdMeme._id);
        setSharedUrl("http://localhost:3000/memes/" + createdMeme._id)
        // TODO wo bekomme ich den link für die singleview
      })
  }

  return (
    <div>
        <p> Hier kann das Borad gespeichert werden</p>
        <TextField type="text" name="Title" label="Title" variant="filled" value={title || ""} onChange={ (e) => {
          e.preventDefault();
          setTitle(e.target.value)
        }} />
        <TextField type="text" name="Description" label="Description" variant="filled" value={description || ""} onChange={ (e) => {
          e.preventDefault();
          setDescription(e.target.value)
        }} />
        
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="private"
          name="radio-buttons-group"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <FormControlLabel value="private" control={<Radio />} label="private" />
          <FormControlLabel value="public" control={<Radio />} label="public" />
        </RadioGroup>
        <p>{selectedOption}</p>
        <Button variant="contained" onClick={() => sendtoServer()}> send to server </Button>
        <br/>
        <p> Die größe der Datei wird in KB angegeben</p>
        <TextField type="number" name="Compress" label="Compress" variant="filled" value={maxSize} onChange={e => setMaxSize(e.target.value)} />
        <Button variant="contained" onClick={handleSave}>Download Compressed Image</Button>
        <p>{sharedUrl === "" ? "" : <Link href={sharedUrl} target="_blank"> Dein erstelltes Meme </Link>}</p>
        {sharedUrl === "" ? "" : <Share url={sharedUrl}/>}
    </div>
  );
}

export default Save_Form;