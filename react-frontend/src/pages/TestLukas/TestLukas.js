/* import React, { useState } from 'react';

function TestLukas() {
  const [base64, setBase64] = useState('');

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(btoa(reader.result));
    };
    reader.readAsBinaryString(file);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3002/upload-image', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meme_encoded: base64
      })
    })
      .then(response => response.json())
      .then(content => {
        console.log(content)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={handleChange} />
      <p>{base64}</p>
      {console.log(base64)}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default TestLukas;
 */

import React, { useState } from "react";

function TestLukas() {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [encodedImage, setEncodedImage] = useState("");

  const handleDecode = async () => {
    const image = await fetch(base64)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
    setImageSrc(image);
  };

  const handleEncode = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEncodedImage(reader.result);
    };
  };

  return (
    <>
      <h1>Base64 Image</h1>
      <label>Enter Base64 String:</label>
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
      <label>Encode Image:</label>
      <br />
      <input type="file" onChange={handleEncode} />
      <br />
      <textarea value={encodedImage} readOnly={true} />
    </>
  );
}

export default TestLukas;


