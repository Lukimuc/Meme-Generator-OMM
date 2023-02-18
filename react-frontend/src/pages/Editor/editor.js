import React, { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Text } from 'react-konva';

import My_Image from './Konva_Components/my_image';
import My_Text from './Konva_Components/my_text';
import Editiere_Text from './editire_text';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Image_Form from './Form_Components/image_form_component';
import Text_Form from './Form_Components/text_form_component';
import Save_Form from './Form_Components/save_component';
import { TextField } from '@mui/material';

const Editor = (props) => {

    const stageRef = useRef(null);

    //größe Konva Board 
   // const [width, setWidth] = useState("100%")
   // const [height, setHeight] = useState("100%")

    const [divWidth, setDivWidth] = useState(500);
    const [divHeight, setDivHeight] = useState(500);

    useEffect(() => {
        const content = stageRef.current.content;
    
        content.style.border = '3px solid black';
        content.style.backgroundColor = 'white';
      }, []);

    // Variable für Editor Forms
    
    const [changeText, setChangeText] = useState(<p>Hier werdn die Texte manipuliert</p>)
    const [mytexts, setMytexts] = useState([])
    const [images, setImages] = useState([])
    // Selecting shapes
    const [selectedId, selectShape] = useState(null);

    const [formcomponent, setFormComponent] = useState(<Image_Form
        push_image={ (input_image, count) => setImages( arr => [...arr, {src: input_image, key:"Image_" + count}])}
        count ={images.length} 
    />)
   

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
        check_text_clickt()
    };

    function handleKeyDown(e) {
        if (e.metaKey || e.ctrlKey && e.key === 'Backspace') {
            setImages(images.filter( (img) => img.key !== selectedId))
            setMytexts(mytexts.filter( (text) => text.key !== selectedId))
        }
    }

    function clickbutton (tmp) {
        if(tmp === "Images") {
            setFormComponent(
                <Image_Form
                    push_image={ (input_image, count) => setImages( arr => [...arr, {src: input_image, key:"Image_" + count}])}
                    count = {images.length} 
                />
            )
        }else if(tmp === "Texts") {
            setFormComponent(
                <Text_Form
                    push_text={ (input) => {
                        setMytexts(arr => [...arr, {
                        text:input.text,
                        fontFamily:input.fontFamily,
                        fontStyle:input.fontStyle,
                        fill:input.fill,
                        key:"Text_" + input.counter}])
                        
                    } } 
                    count= {mytexts.length}   
                />
            )
            
            
        }else if (tmp === "Save") {
            setFormComponent(<Save_Form
                stageRef={stageRef}
                user={props.user}
            />)
        }else {
            setFormComponent(<p>Error</p>)
        }
    }

    const handleChangeText = (array, index, attr) => {
        const newArray = [...array];
        newArray[index].text = attr.text;
        newArray[index].fontFamily = attr.fontFamily
        newArray[index].fontStyle = attr.fontStyle
        newArray[index].fill = attr.fill
        return newArray
    }

    const check_text_clickt = (id) => {
        //console.log("check Text clickt called mit der ID: " + selectedId)
        const tmp = mytexts.findIndex( (text) => text.key === id)
        if (tmp >= 0){
            setChangeText(
                <Editiere_Text
                    text_attr={mytexts[tmp]}
                    onClick={ (key, attr) => {
                        const index = mytexts.findIndex( (text) => text.key === key)
                        setMytexts(handleChangeText(mytexts, index, attr))
                    }}
                />
            )
        }else {  
            setChangeText(<p>Hier werdn die Texte manipuliert</p>)
        }
    }
 
    const delete_all = () => {
        console.log("Clear Button was clickt")
        setImages([])
        setMytexts([])
    }

    const handleStageResize = () => {
        //hier kann man die Stage anpassen

       // setDivWidth(stageRef.current.offsetWidth);
      //  setDivHeight(stageRef.current.offsetHeight);
      //  Stage.height(stageRef.current.offsetWidth);
      };
      
    /*  useEffect(() => {
        handleStageResize();
      }, []);*/
   
    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            <Grid container paddingLeft={10} paddingTop={10} paddingRight={10} spacing={1}>
                <Grid item md={8}>
                <div style={{
                    display: "block",
                    //height: divHeight,
                    //width: divWidth,
                    /* float: "left",*/
                   //border: "5px outset grey",
                   // height: {height},
                  //  width: {width},
                    }}
                >
                    
                <Stage 
                    width={divWidth}
                    height={divHeight}
                    //style={{
                    //    border: "1px outset red",
                    //}}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    ref={stageRef}
                >
                    <Layer>
                        {images.map( (img, i) => {
                            return (
                                <My_Image 
                                    key={"Image_" + i}
                                    imageUrl={img.src}
                                    isSelected={img.key === selectedId}
                                    onSelect={() => { 
                                        selectShape(img.key)
                                       }}
                                    onChange={newAttrs => {
                                        const imgs = images.slice();
                                        imgs[i] = newAttrs;
                                    }}
                                    width={divWidth}
                                    height={divHeight}
                                />
                            );
                        })}
                        
                        {mytexts.map( (text, i) => {
                            return(
                                <My_Text 
                                    key={"Text_" + i}
                                    attr={
                                        {
                                            text: text.text,
                                            fontFamily: text.fontFamily,
                                            fontStyle:text.fontStyle,
                                            fill:text.fill,
                                        }
                                    }
                                    isSelected={text.key === selectedId}
                                    onSelect={() => { 
                                        selectShape(text.key)
                                        check_text_clickt(text.key)
                                         }}
                                    onChange={newAttrs => {
                                        const imgs = images.slice();
                                        //imgs[i] = newAttrs;
                                    }}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
                
                </div>
                </Grid>
                <Grid item md={4}>
                    <h1 textAlign='center'>Editor</h1>
                    <Button variant="contained" onClick={() => { clickbutton("Images") }}> Images </Button>
                    <Button variant="contained" onClick={() => { clickbutton("Texts") }}> Texts </Button>
                    <Button variant="contained" onClick={() => { clickbutton("Save") }}> Save </Button>
                    {formcomponent}
                    {changeText}
                    <Button variant="contained" onClick={() => delete_all()}> Clear </Button> <br/>
                    <TextField 
                        type="number"
                        name="Width Editor"
                        label="Width Edtor"
                        variant="filled"
                        value={divWidth}
                        onChange={ (event) => {
                            event.preventDefault();
                            setDivWidth(parseInt(event.target.value))
                    } } />
                    <TextField 
                        type="number"
                        name="Height Editor"
                        label="Height Edtor"
                        variant="filled"
                        value={divHeight}
                        onChange={ (event) => {
                            event.preventDefault();
                            setDivHeight(parseInt(event.target.value))
                    } } />

                </Grid>
            </Grid>
            
        </div>
        
        )
        
        
    }
    
export default Editor
