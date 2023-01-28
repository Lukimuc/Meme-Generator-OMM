import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function Save_Form2({ stageRef }) {
  const [MAX_SIZE,setMaxSize] = useState(1)

  const handleDownload = () => {

  let quality = 1;
  let base64Image;
  let blob;
  do {
      // Convert the stage to a base64-encoded PNG
      base64Image = stageRef.toDataURL({
          mimeType: 'image/png',
          quality: quality
      });

      // Convert the base64 image to a blob
      const byteCharacters = atob(base64Image.split(',')[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }

      blob = new Blob(byteArrays, {type: 'image/png'});
      console.log(blob.size)

      // Decrease the quality by 0.1
      quality -= 0.1;

  } while (blob.size > MAX_SIZE && quality >= 0);
  // Check the size of the blob
  if (blob.size > MAX_SIZE) {
      alert("Image is too large!");
      return;
  }

  // Download the compressed image
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "compressed-image.png";
  link.click();
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
        <br/>
        <input type="number" value={MAX_SIZE} onChange={e => setMaxSize(e.target.value)} />
        <button onClick={handleDownload}>Download Compressed Image</button>
    </div>
  );
}

export default Save_Form2;