import React, {useState, useEffect} from 'react'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {Meme} from '../../Home/Meme';
import Upload_Image from '../Image_Inputs/upload_images';
import Third_Party from '../Image_Inputs/Third_party';
import { CameraFeed } from '../Image_Inputs/Kamera_Feed';
import Mouse_Draw from '../Image_Inputs/Mouse_Draw';
import Url from '../Image_Inputs/Url';
//import CameraFeed from '../Image_Inputs/Camera_feed_new';

const Image_Form = ({push_image, count}) => {

    const [counter, setCounter] = useState(count)

    const [image_input, setImageInput] = useState(<Upload_Image push= { (src) => {setImages( arr => [...arr, src])}}/>)

    const [template, setTemplate] = useState(null);
    const [templates, setTemplates] = useState(null);

    const [input_image, setInput_Image] = useState()

    //testing image inputs
    const [images, setImages] = useState(["https://konvajs.org/assets/lion.png"])

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

    const clickbutton = (text) => {
        switch(text) {
            case "File_Upload":
                setImageInput(<Upload_Image
                    push= { (src) => {setImages( arr => [...arr, src])}}    
                />)
                break;
            case "Url":
                setImageInput(<Url
                    push= { (src) => {
                        console.log(src)
                        setImages( arr => [...arr, src])}} 
                />)
                break;
            case "Third_Party":
                setImageInput(<Third_Party
                    push= { (src) => {setImages( arr => [...arr, src])}}
                />)
                break;
            case "Camera":
                setImageInput(<CameraFeed 
                    push= { (src) => {setImages( arr => [...arr, src])}}  
                />)
                break;
            case "Draw":
                setImageInput(<Mouse_Draw
                    push= { (src) => {setImages( arr => [...arr, src])}}
                />)
                break;
            default:
                setImageInput(<p>Es ist ein Fehler aufgetreten</p>)
        }
    }

    return(
        <div>
            <p> Image Form Component</p>
            {/**<img src={"https://konvajs.org/assets/lion.png"} alt={"Lion"} /> */}
            {images.map( (image, i) => {
                return(
                <div>
                    <img src={image} alt={"Lion" + i} key={"Lion" + i} onClick={() => setInput_Image(image)}/>
                </div>)
            })}
            {/** 
            <Box style={{maxHeight: '30vh', overflow: 'auto', paddingTop:10}}>
            
            {/** 
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
                        />
                    </Grid>
                )})}
            </Grid>
            
            </Box>
            */}
            <br/>
            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image, counter);
                console.log(counter)
                setCounter(counter+1)                     
            }}>Submit Image</Button>
            <p> {input_image} </p>

            <button onClick={() => { clickbutton("File_Upload") }}> File Upload </button>
            <button onClick={() => { clickbutton("Url") }}> Url </button>
            <button onClick={() => { clickbutton("Third_Party") }}> Third Party </button>
            <button onClick={() => { clickbutton("Camera") }}> Camera </button>
            <button onClick={() => { clickbutton("Draw") }}> Draw </button>
            {image_input}
            {/**<Upload_Image />
            <Third_Party /> */}
        </div>
    );

}

export default Image_Form;