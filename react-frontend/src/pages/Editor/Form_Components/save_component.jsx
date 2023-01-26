import React, { useRef } from 'react';

function Save_Form({ stageRef }) {

  const handleSave = async(quality) => {
    console.log("Handle save it der quality " + quality + " wurde aufgerufen!")
    if (!stageRef.current) {
        console.log("Stageref ist null")
        return;
    }
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({
        mimeType: 'image/png',
        quality: quality
    });
    //saveAs(compressedFile, 'compressedImage.jpg');
    //const file = new Blob([dataURL], { type: 'image/png' });
    //saveAs(file, 'image.png');

    //const base64 = btoa(dataURL);
     
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image.jpeg';
    link.click();
    
    // do something with the dataURL, like setting it as the source for an image element
    //console.log(dataURL);
  };

  const sendtoServer = () => {
    if (!stageRef.current) {
      console.log("Stageref ist null")
      return;
    }
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({
      mimeType: 'image/png',
      quality: 1
    });

    createMeme(dataURL)
  }

  const createMeme = (image) => {
    fetch('http://localhost:3002/memes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "test", // TODO
        image_encoded: image
      })
    })
      .then(response => response.json())
      .then(createdMeme => {
        console.log(createdMeme);
      })
  }

  return (
    <div>
        <p> Hier kann das Borad gespeichert werden</p>
        <button onClick={() => sendtoServer()}> send to server </button>
        <button onClick={() => handleSave(0.001)}>low</button>
        <button onClick={() => handleSave(0.05)}>medium</button>
        <button onClick={() => handleSave(1)}>hight</button>
    </div>
  );
}

export default Save_Form;