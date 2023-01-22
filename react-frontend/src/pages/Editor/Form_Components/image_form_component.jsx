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

const Image_Form = ({push_image}) => {

    const [image_input, setImageInput] = useState(<Upload_Image/>)

    const [template, setTemplate] = useState(null);
    const [templates, setTemplates] = useState(null);

    const [input_image, setInput_Image] = useState()

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
                setImageInput(<Upload_Image/>)
                break;
            case "Url":
                setImageInput(<Url/>)
                break;
            case "Third_Party":
                setImageInput(<Third_Party/>)
                break;
            case "Camera":
                setImageInput(<CameraFeed />)
                break;
            case "Draw":
                setImageInput(<Mouse_Draw/>)
                break;
            default:
                setImageInput(<p>Es ist ein Fehler aufgetreten</p>)
        }
    }

    return(
        <div>
            <p> Image Form Component</p>
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
                        />
                    </Grid>
                )})}
            </Grid>
            </Box>
            <br/>
            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image)                       
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