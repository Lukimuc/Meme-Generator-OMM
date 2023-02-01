import React, { useEffect, useRef, useState } from 'react';

const CameraFeed = ({props}) => {
    const videoPlayer = useRef(null);
    const canvas = useRef(null);
    const [activeDevice, setActiveDevice] = useState(null);

    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    function processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            setActiveDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async function setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        videoPlayer.current.srcObject = stream;
        videoPlayer.current.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    useEffect(() => {
        async function getCameras() {
            const cameras = await navigator.mediaDevices.enumerateDevices();
            processDevices(cameras);
        }
        getCameras();
    }, []);

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    async function takePhoto() {
        const { sendFile } = props;
        const context = canvas.current.getContext('2d');
        context.drawImage(videoPlayer.current, 0, 0, 680, 360);
        const blob = await canvas.current.toBlob();
        sendFile(blob);
    }

    return (
        <div className="c-camera-feed">
            <div className="c-camera-feed__viewer">
                <video ref={videoPlayer} width="680" heigh="360" />
            </div>
            <button onClick={takePhoto}>Take photo!</button>
            <div className="c-camera-feed__stage">
                <canvas width="680" height="360" ref={canvas} />
            </div>
        </div>
    );
}

export default CameraFeed;