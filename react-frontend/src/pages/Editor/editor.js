import React, { useState, useEffect } from 'react'
import { Stage, Layer, Text } from 'react-konva';
import My_Image from './my_image';
import My_Text from './my_text';
import {Meme} from '../Home/Meme';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Image_Form from './Form_Components/image_form_component';
import Text_Form from './Form_Components/text_form_component';
import Save_Form from './Form_Components/save_component';


const Editor = () => {

    // Variable für Editor Forms
    const [formcomponent, setFormComponent] = useState(<Image_Form/>)

    // Variablen für Texte
    const [input_text, setInputs_Text] = useState()
    const [mytexts, setMytexts] = useState([])
    // Variables changing text
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    // Variablen für images
    const [input_image, setInput_Image] = useState()
    const [images, setImages] = useState([])
     //Variablen für Memes
     const [template, setTemplate] = useState(null);
     const [templates, setTemplates] = useState(null);
    // Selecting shapes
    const [selectedId, selectShape] = useState(null);
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
    };
    useEffect(() => {
        fetchMemes();
      }, []);
    
    const fetchMemes = async () => {
        try {
          const response = await fetch("https://api.imgflip.com/get_memes")
          const data = await response.json();
          setTemplates(data.data.memes);
        } catch (error) {
          console.log(error);
        }
    };

    function handleKeyDown(e) {
        if (e.key === 'Backspace') {
            console.log("Backspace key is pressed")
            console.log("Das Selectec shape ist: " + selectedId)
            setImages(images.filter( (img) => img.key !== selectedId))
            setMytexts(mytexts.filter( (text) => text.key !== selectedId))
        }
    }

    function clickbutton (tmp) {
        if(tmp === "Images") {
            setFormComponent(<Image_Form/>)
        }else if(tmp === "Texts") {
            setFormComponent(
            <Text_Form
                push_text={ (input_text) => setMytexts(arr => [...arr, {text:input_text,key:"Text_" + mytexts.length}])}
            />
            )
        }else if (tmp === "Save") {
            setFormComponent(Save_Form)
        }else {
            setFormComponent(<p>Error</p>)
        }
        

    }
      
    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            <Grid container paddingLeft={10} paddingTop={10} paddingRight={10} spacing={1}>
<Grid item md={8}>
            <div style={{
                display: "block",
               /* float: "left",*/
                border: "5px outset grey",
               /* height: "100%",
                width: "50%",*/
                }}
            >
                <Stage 
                    width={window.innerWidth / 2}
                    height={window.innerHeight}
                    style={{
                        border: "1px outset grey",
                    }}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                 >
                    <Layer>
                        {images.map( (img, i) => {
                            return (
                                <My_Image 
                                    key={"Image_" + i}
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
                                    key={"Text_" + i}
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
                                    onTextClick={(newSelected) => { 
                                        //eventuell muss auch hier der text übergeben werden
                                        //index herausfinden und text überschreiben
                                        console.log("Der werd wurde ausgewählt: " + newSelected)
                                        selectShape(text.key) }}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
                
            </div>
            </Grid>
            <Grid item md={4}>
                <h1 textAlign='center'>Editor</h1>
                <button onClick={() => { clickbutton("Images") }}> Images </button>
                <button onClick={() => { clickbutton("Texts") }}> Texts </button>
                <button onClick={() => { clickbutton("Save") }}> Save </button>
            <div>
                        {formcomponent}
                    {/**
                     * <TextField style={{paddingBottom:10}} label="Add text" type="text" value={input_text || ""} onChange={(e) => setInputs_Text(e.target.value)}></TextField>
                    <br/>
                    <Button variant="contained" onClick={(e) => {
                        e.preventDefault();
                        setMytexts( arr => [...arr, {text:input_text,key:"Text_" + mytexts.length}])
                    }}>Submit Text</Button>
                */}
                    <br/>
               
                  {/*}  {template && <Meme template={template} name={template.name}  />}*/}
  {/*vorher war template statt templates? whats the difference???}*/}
  {/*<Grid container spacing={2}>*/}
  <Box style={{maxHeight: '30vh', overflow: 'auto', paddingTop:10}}>
  <Grid container>
        {templates && templates.map((template) => {
             return (
                       <Grid item md={3} key={template.id}>
             <Meme
             template={template}
             width={90}
             onClick={(e) => {
                e.preventDefault();
                setInput_Image(e.target.src);
                setTemplate(template);
            }}
              /* onClick={() => {
                 setTemplate(template);
               }}*/
             />
             
             </Grid>
        
        )
            }
        )}
</Grid>
</Box>
                  {/*  <img
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
                    */}
                  {/*}  </Grid> */}
                    <br/>
                    <Button variant="contained" onClick={(e) => {
                        e.preventDefault();
                        setImages( arr => [...arr, {src: input_image, key:"Image_" + images.length}])
                       
                    }}>Submit Image</Button>
                    <p>{input_text}</p>
                    <p>{input_image}</p>
                    
   
            </div>
            </Grid>
            </Grid>
            
        </div>
        
        )
        
        
    }
    
export default Editor
