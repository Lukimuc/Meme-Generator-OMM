import React, { Component } from 'react';

import Button from '@mui/material/Button';

export class CameraFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
          photo: ''
        };
    }

    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    takePhoto = () => {
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        const photo = this.canvas.toDataURL();
        this.setState({ photo });
    };

    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
                </div>
                <Button variant="contained" onClick={this.takePhoto}>Take photo!</Button>
                <div className="c-camera-feed__stage">
                    <canvas width="680" height="360" ref={ref => (this.canvas = ref)} /> 
                    {/**<img src={this.state.photo} alt="Taken photo" />*/}
                    <Button variant="contained" onClick={() => {console.log("Foto wird gepushed"); this.props.push(this.state.photo)}} > push </Button>
                </div>
            </div>
        );
    }
}