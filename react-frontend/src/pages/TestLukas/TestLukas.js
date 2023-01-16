import React, { useState } from "react";


function TestLukas(props) {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [encodedImage, setEncodedImage] = useState("");



  // Verschlüsseln
  const handleEncode = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEncodedImage((prev) => {
        const updatedImage = reader.result
        console.log(updatedImage); // this should give you the expected result
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
    console.log("inside createdMeme", encodedImage);
    fetch('http://localhost:3002/meme', {
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

  const getMeme = (event) => {
    event.preventDefault();
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
      <button onClick={getMeme}> Get Meme from server </button>
    </>
);
}

export default TestLukas;


