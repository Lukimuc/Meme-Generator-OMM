import React, { useState } from "react";

const VoiceControls = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const [transcript, setTranscript] = useState("");
    const [playback, setPlayback] = useState(false);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    const startRecording = () => {
        setIsRecording(!isRecording);
        if (isRecording) {
            recognition.abort();
        } else {
            recognition.start();
            recognition.onresult = event => {
                let current = event.resultIndex;
                let transcript = event.results[current][0].transcript.toLowerCase();
                setTranscript(transcript);
                if (transcript === "back" || transcript === " back") {
                    setButtonClicked("Back");
                } else if (transcript === "pause" || transcript === "play" || transcript === " play" || transcript === " pause") {
                    setPlayback(!playback);
                    setButtonClicked(transcript);
                } else if (transcript === "next" || transcript === " next") {
                    setButtonClicked("Next");
                }
            };
        }
    };

    return (
        <div>
            <button onClick={startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            <button onClick={() => setButtonClicked("Back")}>Back</button>
            <button
                onClick={() => {
                    setPlayback(!playback);
                    setButtonClicked(playback ? "Pause" : "Play");
                }}
            >
                {playback ? "Pause" : "Play"}
            </button>
            <button onClick={() => setButtonClicked("Next")}>Next</button>
            <div>{transcript}</div>
            <div>{buttonClicked} </div>
        </div>);
};

export default VoiceControls;
