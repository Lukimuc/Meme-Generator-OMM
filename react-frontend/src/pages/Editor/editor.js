import React, { useState } from 'react'
import { Stage, Layer, Image, Text } from 'react-konva';

const Editor = () => {
    //const dragUrl = React.useRef();
    const stageRef = React.useRef();
    //const width = window.innerWidth
    const height = window.innerHeight

    const [inputtext, setInputtext] = useState()
    const [inputs, setInputs] = useState([])
    return (
        <div>
            <div>
                Hier wird der Editor sein:
            </div>
            <div style={{
                display: "block",
                float: "left",
                border: "5px outset blue",
                height: height,
                width: "50%",
            }}>
                <Stage 
                    width={window.innerHeight}
                    height={window.innerHeight}
                    style={{
                        border: "1px outset red",
                    }}
                    ref={stageRef}>
                    <Layer>
                        {inputs.map( (input => { return <Text key={input} text={input} draggable={true} />})) }
                    </Layer>
                </Stage>
            </div>
            <div>
                <form>
                    <label>Text hinzufügen</label><br/>
                    <input type="text" value={inputtext || ""} onChange={(e) => setInputtext(e.target.value)}/><br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setInputs( arr => [...arr, inputtext])
                    }}>Submit</button>
                    <p>{inputtext}</p>
                    
                </form>
            </div>
        </div>
        )
    }

export default Editor