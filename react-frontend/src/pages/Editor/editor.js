import React, { useState } from 'react'
import { Stage, Layer, Text } from 'react-konva';
import My_Image from './my_image';
import My_Text from './my_text';



const Editor = () => {

    // Variablen für Texte
    const [input_text, setInputs_Text] = useState()
    const [mytexts, setMytexts] = useState([])

    // Variables changing text
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    // Variablen für images
    const [input_image, setInput_Image] = useState()
    const [images, setImages] = useState([])



    // Selecting shapes
    const [selectedId, selectShape] = useState(null);
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
    };

    return (
        <div>
            <div>
                Hier wird der Editor sein:
            </div>
            <div style={{
                display: "block",
                float: "left",
                border: "5px outset blue",
                height: "100%",
                width: "50%",
                }}
            >
                <Stage 
                    width={window.innerWidth / 2}
                    height={window.innerHeight}
                    style={{
                        border: "1px outset red",
                    }}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                 >
                    <Layer>
                        {images.map( (img, i) => {
                            return (
                                <My_Image 
                                    key={i}
                                    imageUrl={img.src}
                                    isSelected={img.key === selectedId}
                                    onSelect={() => { selectShape(img.key) }}
                                    onChange={newAttrs => {
                                        const imgs = images.slice();
                                        imgs[i] = newAttrs;
                                    }}
                                    width={i === 0 ? window.innerWidth * 0.5 : img.width}
                                    height={i === 0 ? window.innerHeight: img.height}
                                />
                            );
                        })}
                        {mytexts.map( (text, i) => {
                            return(
                                <My_Text 
                                    x={50}
                                    y={50}
                                    text={text.text}
                                    colour="#FFDAE1"
                                    onTextChange={
                                        // Hier muss der Text angepasst werden , dass er sich ändert
                                        (value) => text.text=value}
                                    width={width}
                                    height={height}
                                    selected={text.key === selectedId}
                                    onTextResize={(newWidth, newHeight) => {
                                        setWidth(newWidth);
                                        setHeight(newHeight);
                                    }}
                                    onClick={ () => { selectShape(text.key) }}
                                    onTextClick={() => { 
                                        //eventuell muss auch hier der text übergeben werden
                                        selectShape(text.key) }}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
            <div>
                <form>
                    <label>Text hinzufügen</label><br/>
                    <input type="text" value={input_text || ""} onChange={(e) => setInputs_Text(e.target.value)}/><br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setMytexts( arr => [...arr, {text:input_text,key:"Text_" + mytexts.length}])
                    }}>Submit</button>
                    <br/>
                    <img
                        alt="lion"
                        src="https://konvajs.org/assets/lion.png"
                        draggable="true"
                        onClick={(e) => {
                            e.preventDefault();
                            setInput_Image(e.target.src)
                        }}
                        stroke="black"
                    />
                    <img 
                        alt="yoda"
                        src="https://konvajs.org/assets/yoda.jpg"
                        draggable="true"
                        onClick={(e) => {
                            setInput_Image(e.target.src)
                        }}
                        stroke="black"
                    />
                    <br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImages( arr => [...arr, {src: input_image, key:"Image_" + images.length}])
                        
                    }}>Submit Image</button>
                    <p>{input_text}</p>
                    <p>{input_image}</p>
                    
                </form>
            </div>
        </div>
        )
    }

export default Editor