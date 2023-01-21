import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:8080');

function Stream() {
  const [message, setMessage] = useState("Streaming: OFF");
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.log(`Could not access the camera. Error: ${error.name}`);
      });
    return () => {
      // cleanup the stream when the component unmounts
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (!streaming) return;
    const context = canvasRef.current.getContext("2d");
    let intervalId;
    intervalId = setInterval(() => {
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      socket.emit("streaming", canvasRef.current.toDataURL("image/webp"));
    }, 40);

    return () => {
      // cleanup the interval when the component unmounts or the "stopStream" button is clicked
      clearInterval(intervalId);
    };
  }, [streaming]);

  const startStream = () => {
    setMessage("Streaming: ON");
    setStreaming(true);
  };

  const stopStream = () => {
    setMessage("Streaming: OFF");
    setStreaming(false);
  };

  return (
    <div>
      <h2>Anchor:</h2>
      <button onClick={startStream} disabled={streaming}>Start streaming</button>
      <button onClick={stopStream} disabled={!streaming}>Stop streaming</button>
      <p>{message}</p>
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
    </div>
  );
}

export default Stream;
