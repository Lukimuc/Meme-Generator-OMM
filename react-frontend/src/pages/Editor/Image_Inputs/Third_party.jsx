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
            {templates && templates.map((template) => {
                return (
                    <Grid item md={3} key={template.id}>
                        <Meme
                        template={template}
                        width={90}
                        onClick={(e) => {
                            e.preventDefault();
                            setTemplate(template);
                        }}
                        />
                    </Grid>
                )})
            }
            <TextField style={{paddingBottom:10}} label="Add text" type="Url" value={Url || ""} onChange={(e) => setUrl(e.target.value)}/>
            <button onClick={ submitUrl()} />
            {imagesrc}
            <button onClick={ () => push(template.url)} > push </button>
        </div>
    )
}

export default Third_Party;