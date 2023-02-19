import React, {useState, useEffect} from 'react'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {Meme} from '../../Home/Meme';

const Third_Party = ({push}) => {

    const [templates, setTemplates] = useState(null);
    const [template, setTemplate] = useState(null);
    const [Url, setUrl] = useState()

    const [imagesrc, setImageSrc] = useState(<p> Ausgewähltes image </p>) 
    
    const submitUrl = () => {
        fetchMemes(Url)
    }

    const fetchMemes = async (Url) => {
        try {
          const response = await fetch(Url)
          const data = await response.json();
          setTemplates(data.data.memes);
          console.log(JSON.stringify(templates))
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div>
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
            {templates && templates.map((template) => {
                return (
                        <Meme
                        template={template}
                        //width={90}
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                        onClick={(e) => {
                            e.preventDefault();
                            setTemplate(template);
                        }}
                        />
                )})
            }
            </div>
            </div>
            <TextField style={{paddingBottom:10}} label="Add text" type="Url" value={Url || ""} onChange={(e) => setUrl(e.target.value)}/>
            <Button variant="contained" onClick={ submitUrl()} />
            {imagesrc}
            <Button variant="contained" onClick={ () => push(template.url)} > push </Button>
        </div>
    )
}

export default Third_Party;