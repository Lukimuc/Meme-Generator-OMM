import React, { useState } from "react";

const VoiceControls = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const [transcript, setTranscript] = useState("");
    const [textFieldText, setTextFieldText] = useState("");
    const [playback, setPlayback] = useState(false);
    const [isTextFieldSelected, setIsTextFieldSelected] = useState(false);

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
                let newTranscript = event.results[current][0].transcript.toLowerCase();
                if (isTextFieldSelected) {
                    setTranscript(newTranscript);
                } else {
                    setTranscript(transcript + " " + newTranscript);
                }
                if (newTranscript === "back" || newTranscript === " back") {
                    setButtonClicked("Back");
                } else if (newTranscript === "pause" || newTranscript === "play" || newTranscript === " play" || newTranscript === " pause") {
                    setPlayback(!playback);
                    setButtonClicked(newTranscript);
                } else if (newTranscript === "next" || newTranscript === " next") {
                    setButtonClicked("Next");
                } else if (newTranscript === "select" || newTranscript === " select") {
                    setIsTextFieldSelected(true);
                } else if (newTranscript === "deselect" || newTranscript === " deselect" || newTranscript === " die select") {
                    setIsTextFieldSelected(false);
                    setTextFieldText(transcript);
                }
            };
        }
    }; return (
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
            <input
                type="text"
                onFocus={() => setIsTextFieldSelected(true)}
                onBlur={() => {
                    setIsTextFieldSelected(false);
                    setTextFieldText(transcript);
                }
                }
                value={isTextFieldSelected ? transcript : textFieldText}
                style={isTextFieldSelected ? { borderColor: "blue" } : {}}
            />
            <div>Transcript: {transcript} </div>
            <div>Button clicked: {buttonClicked} </div>
        </div>
    );
};

export default VoiceControls;

