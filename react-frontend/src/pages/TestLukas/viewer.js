import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Viewer = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:8080');
    socket.on("streaming", data => {
      setImageData(data);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h3>Viewer</h3>
      {imageData && <img src={imageData} alt="Stream" />}
    </>
  );
}

export default Viewer;
