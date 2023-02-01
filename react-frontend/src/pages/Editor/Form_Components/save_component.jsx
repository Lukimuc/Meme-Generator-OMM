import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';


function Save_Form({ stageRef }) {

  const [maxSize, setMaxSize] = useState(1);

  const save_Element = (blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed_image.jpg";
    link.click();

  }

  const handleSave = async() => {
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
        <p> Die größe der Datei wird in KB angegeben</p>
        <input type="number" value={maxSize} onChange={e => setMaxSize(e.target.value)} />
        <button onClick={handleSave}>Download Compressed Image</button>
    </div>
  );
}

export default Save_Form;