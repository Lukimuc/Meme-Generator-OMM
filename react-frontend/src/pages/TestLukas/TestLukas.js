import React, { useState } from "react";
import MemeLukas from "./MemeLukas";

function TestLukas(props) {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [encodedImage, setEncodedImage] = useState("");
  const [memesfromServer, setMemesFromServer] = useState([]);
  const [memeId, setMemeId] = useState(""); // get meme by MemeID Textfield

  // Verschlüsseln
  const handleEncode = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEncodedImage((prev) => {
        const updatedImage = reader.result
        console.log(updatedImage);
        return updatedImage;
      });
    };

  };

  // Entschlüsseln
  const handleDecode = async () => {
    const image = await fetch(base64)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
    setImageSrc(image);
  };

  const createMeme = (event) => {
    fetch('http://localhost:3002/memes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: props.user.email,
        image_encoded: encodedImage
      })
    })
      .then(response => response.json())
      .then(createdMeme => {
        console.log(createdMeme);
      })
  }

  // Plural
  const getMemes = (event) => {
    fetch('http://localhost:3002/memes', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(memes => {
        setMemesFromServer(memes);  // set the state of memesfromServer to the received memes
      })
  }

  // Singular
  const getMeme = (event) => {
    fetch(`http://localhost:3002/memes/${memeId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(meme => {
        document.getElementById("specificMemeID").innerHTML = "meme.id "+ meme._id+ " meme.title "+ meme.title+ " meme.likes "+ meme.likes+ " meme.CreatorID "+meme.CreatorID;
        console.log(meme);
      })
  }


  return (
    <>
      <h1>Base64 Image</h1>

      <label>Upload & Encode Image:</label>
      <br />
      <input type="file" onChange={handleEncode} />
      <br />
      <textarea value={encodedImage} readOnly={true} />
      <br /><br />


      <label>Enter Base64 String and get Image:</label>
      <br />
      <input
        type="text"
        value={base64}
        onChange={(e) => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleDecode}>Decode Image</button>
      <br />

      <img src={imageSrc} alt="Decoded Image" />
      <br />
      <br />
      <br />
      <button onClick={createMeme}>Create picture  / "Meme" on server </button>
      <button onClick={getMeme}> Get all Memes from server </button>
      <br /><br />
      {/* get a specific Meme by MemeID: */}
      <label>Enter Meme ID - Siehe DB - Memes - _id:</label>
      <br />
      <input
        type="text"
        value={memeId}
        onChange={(e) => setMemeId(e.target.value)}
      />
      <br /><br />
      <button onClick={getMeme}>Get specific Meme</button>
      <div id="specificMemeID"></div>
      <br />

      {/*   // iterate over the .json and create Meme Components */}
      {memesfromServer.map((meme) => (
        <MemeLukas key={meme._id} meme={meme} />
      ))}

    </>
  );
}

export default TestLukas;

