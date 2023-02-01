import React, { useState, useEffect, useRef } from 'react'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Meme } from '../../Home/Meme';
import Upload_Image from '../Image_Inputs/upload_images';
import Third_Party from '../Image_Inputs/Third_party';
import { CameraFeed } from '../Image_Inputs/Kamera_Feed';
import Mouse_Draw from '../Image_Inputs/Mouse_Draw';
import Url from '../Image_Inputs/Url';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
//import CameraFeed from '../Image_Inputs/Camera_feed_new';



const Image_Form = ({ push_image }) => {

    // ---- graph code ---- //
    const fetchRef = useRef(false);

    const [fileUploadButtonClickedTotal, setfileUploadButtonClickedTotal] = useState(0);
    const [urlButtonClickedTotal, seturlButtonClickedTotal] = useState(0);
    const [thirdPartyButtonClickedTotal, setthirdPartyButtonClickedTotal] = useState(0);
    const [cameraButtonClickedTotal, setcameraButtonClickedTotal] = useState(0);
    const [drawButtonClickedTotal, setdrawButtonClickedTotal] = useState(0);

    const [data, setData] = useState([
        { name: 'File Upload', clicks: fileUploadButtonClickedTotal },
        { name: 'URL', clicks: urlButtonClickedTotal },
        { name: 'Third Party', clicks: thirdPartyButtonClickedTotal },
        { name: 'Camera', clicks: cameraButtonClickedTotal },
        { name: 'Draw', clicks: drawButtonClickedTotal },
    ]);
    useEffect(() => {
        fetchInitialData();
    }, [fetchRef]);


    async function fetchInitialData() {
        // fetch data from server
        await fetch('http://localhost:3002/log')
            .then(response => response.json())
            .then(data => {
                const updatedData = [
                    { name: 'File Upload', clicks: data.fileUploadButtonClickedTotal },
                    { name: 'URL', clicks: data.urlButtonClickedTotal },
                    { name: 'Third Party', clicks: data.thirdPartyButtonClickedTotal },
                    { name: 'Camera', clicks: data.cameraButtonClickedTotal },
                    { name: 'Draw', clicks: data.drawButtonClickedTotal },
                ];

                setfileUploadButtonClickedTotal(data.fileUploadButtonClickedTotal);
                seturlButtonClickedTotal(data.urlButtonClickedTotal);
                setthirdPartyButtonClickedTotal(data.thirdPartyButtonClickedTotal);
                setcameraButtonClickedTotal(data.cameraButtonClickedTotal);
                setdrawButtonClickedTotal(data.drawButtonClickedTotal);

                setData(updatedData);
            }
            )
    }

    async function handleDiagram(name) {
        // increment the clicks for the button
        const updatedData = [...data];
        const button = updatedData.find(b => b.name === name);
        button.clicks += 1;
        setData(updatedData);

        // send data to server
        await fetch('http://localhost:3002/log', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(updatedMeme => {
                console.log(updatedMeme);
            }).catch(error => {
                console.log(error);
            });
    }
    // ---- graph code  end ---- //

    const [counter, setCounter] = useState(count)

    const [image_input, setImageInput] = useState(<Upload_Image push= { (src) => {setImages( arr => [...arr, src])}}/>)

    const [template, setTemplate] = useState(null);
    const [templates, setTemplates] = useState(null);

    const [input_image, setInput_Image] = useState()

    //testing image inputs
    const [images, setImages] = useState([])

   

    const loadlocalstorage = () => {
        console.log("item wird rausgeholt!!!")
        const storedImages = JSON.parse(localStorage.getItem('imageList'));
        console.log(storedImages)
        if (storedImages) {
        setImages(storedImages);
        }
    };

    const savelocalstorage = () => {
        console.log("item wird gespeichert!!!")
        localStorage.setItem('imageList', JSON.stringify(images));
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

    const clickbutton = (text) => {
        switch (text) {
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
                setImageInput(<Upload_Image />)
                handleDiagram('File Upload')
                break;
            case "Url":
                setImageInput(<Url />)
                handleDiagram('URL')
                break;
            case "Third_Party":
                setImageInput(<Third_Party />)
                handleDiagram('Third Party')
                break;
            case "Camera":
                setImageInput(<CameraFeed />)
                handleDiagram('Camera')
                break;
            case "Draw":
                setImageInput(<Mouse_Draw />)
                handleDiagram('Draw')
                break;
            default:
                setImageInput(<p>Es ist ein Fehler aufgetreten</p>)
        }
    }

    return (
        <div>
            <p> Image Form Component</p>
            <button onClick={() => savelocalstorage()}> save in localStorage</button>
            <button onClick={() => loadlocalstorage()}> load in localStorage</button>
            {/**<img src={"https://konvajs.org/assets/lion.png"} alt={"Lion"} /> */}
            {images.map( (image, i) => {
                return(
                <div>
                    <img src={image} alt={"Lion" + i} key={"Lion" + i} onClick={() => setInput_Image(image)}/>
                </div>)
            })}
            <br/>
            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image, counter);
                console.log(counter)
                setCounter(counter+1)   
            }}>Submit Image</Button>           
            <Box style={{ maxHeight: '30vh', overflow: 'auto', paddingTop: 10 }}>
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
                        )
                    })}
                </Grid>
            </Box>
            <br />
            {/** <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image)
            }}>Submit Image</Button> */}
            <p> {input_image} </p>

            <button onClick={() => { clickbutton("File_Upload") }}> File Upload </button>
            <button onClick={() => { clickbutton("Url") }}> Url </button>
            <button onClick={() => { clickbutton("Third_Party") }}> Third Party </button>
            <button onClick={() => { clickbutton("Camera") }}> Camera </button>
            <button onClick={() => { clickbutton("Draw") }}> Draw </button>
            {image_input}
            {/**<Upload_Image />
            <Third_Party /> */}

            <h3>Most popular upload function: Template tracker graph</h3>
            <BarChart width={450} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="clicks" fill="#1976d2" barSize={30} />
            </BarChart>
        </div>
    );

}

export default Image_Form;