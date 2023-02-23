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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Image_Form = ({ push_image, count, user }) => {

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

    const [image_input, setImageInput] = useState(<Upload_Image push= { (src) => {setImages( arr => [...arr, {src:src, serverid:""}])}}/>)

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
            storedImages.map( (img) => setImages( arr => [...arr, {src:img.src, serverid:""}]))
        //setImages(...images, storedImages);
        }
    };

    const savelocalstorage = () => {
        console.log("item wird gespeichert!!!")
        localStorage.setItem('imageList', JSON.stringify(images));
    };

    /**
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
     */

    const clickbutton = (text) => {
        switch (text) {
            case "File_Upload":
                setImageInput(<Upload_Image
                    push= { (src) => {setImages( arr => [...arr, {src:src, serverid:""}])}}    
                />)
                handleDiagram('File Upload');
                break;
            case "Url":
                setImageInput(<Url
                    push= { (src) => {
                        console.log(src)
                        setImages( arr => [...arr, {src:src, serverid:""}])}} 
                />)
                handleDiagram('URL');
                break;
            case "Third_Party":
                setImageInput(<Third_Party
                    push= { (src) => {setImages( arr => [...arr, {src:src, serverid:""}])}}
                />)
                handleDiagram('Third Party');
                break;
            case "Camera":
                setImageInput(<CameraFeed 
                    push= { (src) => {setImages( arr => [...arr, {src:src, serverid:""}])}}  
                />)
                handleDiagram('Camera'); 
                break;
            case "Draw":
                setImageInput(<Mouse_Draw
                    push= { (src) => {setImages( arr => [...arr, {src:src, serverid:""}])}}
                />)
                handleDiagram('Draw');
                break;
            default:
                setImageInput(<p>Es ist ein Fehler aufgetreten</p>)
        }
    }

    const checkInputType = (input) => {
        if (typeof input !== 'string') {
          return 'invalid';
        }
        else if (input.length <= 4) {
          return 'invalid';
        }
        else if (input.indexOf('data:image') === 0) {
          return 'base64';
        }
        else {
          return 'url';
        }
      };

    const checkBase64 = () => {
        console.log(user)

        if (user.email === ""){
            toast.error("Kein User angemeldet")
            return
        }

        if (input_image.serverid !== "") {
            toast.error("Template befindet sich bereits auf dem server")
            return
        }

        const input_type = checkInputType(input_image.src);
        if (input_type === "url"){
            // Bild-URL vom Eingabefeld abrufen
            const image_url = input_image.src;
      
            // Bild von der URL abrufen und als Base64 konvertieren
            fetch(image_url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    const image_base64 = reader.result;
      
                    // Base64-Code des Bildes in der Konsole ausgeben
                    console.log(image_base64);
                    sendtoServer(image_base64)
                };
            })
          .catch(error => console.error(error));
        }else if (input_type === "base64"){
            sendtoServer(input_image)
        }else{
            console.log("Es ist ein fehler aufgetreten")
        }
    };

    
    const sendtoServer = (image_encoded) => {
        fetch('http://localhost:3002/template', {
            method:'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email:user.email,
                image_encoded : image_encoded
            })
        }).then(response => {
            if (response.ok) {
              toast.success("Template wurde zum Server geschickt");
            } else {
              toast.error("Fehler beim schicken des templates");
            }
            return response.json();
          })
          .then(createdtemplate => {
            console.log(createdtemplate);
            // TODO wo bekomme ich den link für die singleview
          })
        
    }

    const getTemplates = () => {
        if (user.email === ""){
            toast.error("Kein User angemeldet")
            return
        }

        fetch('http://localhost:3002/template' , {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        }).then ((response) => response.json())
        .then( (res) => {
            res.map( (temp) => setImages( arr => [...arr, {src:temp.template_encoded, serverid:temp._id}]))
        })
    }

    const deletefromServer = () => {
        if (user.email === ""){
            toast.error("Kein User angemeldet")
            return
        }
        if (input_image.serverid === "") {
            toast.error("Templatet konnte nicht gelöscht werden")
            return
        }
        fetch(`http://localhost:3002/template/${input_image.serverid}`, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
        }).then( (res) => {
            if (res.ok){
                toast.success("Template wurde gelöscht")
            }else {
                toast.error("Template konnte nicht gelöscht werden")
            }
        })
    }
     

    return (
        <div>
            <p> Image Form Component</p>
            <Button variant="contained" onClick={() => savelocalstorage()}> save in localStorage</Button>
            <Button variant="contained" onClick={() => loadlocalstorage()}> load in localStorage</Button> <br/>
            <Button variant="contained" onClick={ (e) => {
                e.preventDefault();
                checkBase64()
            }}> Send to Server </Button>

            <Button variant="contained" onClick={ (e) => {
                e.preventDefault();
                getTemplates()
            }} > Load Templates from Server </Button>

            <Button variant="contained" onClick= { (e) => {
                e.preventDefault();
                deletefromServer()
            }} > Delete from Server </Button>
            {/**<img src={"https://konvajs.org/assets/lion.png"} alt={"Lion"} /> */}
            <div style={{
                width: "100%",
                height: "500px",
                overflow: "auto",
            }}>
                <div style={{
                    display: "grid",
                    gridGap: "10px",
                    gridTemplateColumns: "repeat(3, 150px)",
                    gridTemplateRows: "repeat(auto-fit, minmax(150px, 1fr))",
                }}>
                    {images.length === 0 ? <p>Noch kein Template ausgewählt</p> : images.map( (image, i) => {
                        return(
                            <div>
                                <img 
                                    src={image.src} 
                                    alt={"Image" + i} 
                                    key={"Image" + i} 
                                    style={{maxWidth: "100%", maxHeight: "100%", border: input_image === image ? "2px solid black" : "none"}}
                                    onClick={() => setInput_Image(image)}/>
                            </div>)
                    })}
                </div>
            </div>
            <br/>

            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image.src, counter);
                setCounter(counter+1)   
            }}>Submit Image</Button>

            {/**
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
             <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image)
            }}>Submit Image</Button> */}
            <p> {input_image != null ? "Es ist ein Bild ausgewählt" : "Kein Bild ausgewählt"} </p>

            <Button variant="contained" onClick={() => { clickbutton("File_Upload") }}> File Upload </Button>
            <Button variant="contained" onClick={() => { clickbutton("Url") }}> Url </Button>
            <Button variant="contained" onClick={() => { clickbutton("Third_Party") }}> Third Party </Button>
            <Button variant="contained" onClick={() => { clickbutton("Camera") }}> Camera </Button>
            <Button variant="contained" onClick={() => { clickbutton("Draw") }}> Draw </Button>
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