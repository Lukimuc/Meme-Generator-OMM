import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Viewer = () => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const socket = io('wss://localhost:8080');
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
            <p>Start the Stream on the Singleview to see the Stream</p>
            {imageData && <img src={imageData} alt="Stream" style={{width:"750px"}}/>}
        </>
    );
}

export default Viewer;
