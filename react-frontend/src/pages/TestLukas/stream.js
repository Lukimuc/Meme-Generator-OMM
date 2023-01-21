import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import html2canvas from 'html2canvas';

const socket = io('ws://localhost:8080');

function Stream() {
  const [message, setMessage] = useState("Streaming: OFF");
  const [streaming, setStreaming] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!streaming) return;
    const intervalId = setInterval(() => {
      html2canvas(sectionRef.current).then(canvas => {
        socket.emit("streaming", canvas.toDataURL("image/webp"));
      });
    }, 40);

    return () => {
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
      <div ref={sectionRef}>
        {/* Replace this with the section of the website you want to stream */}
        <p>This is the section of the website that will be streamed</p>
      </div>
    </div>
  );
}

export default Stream;
