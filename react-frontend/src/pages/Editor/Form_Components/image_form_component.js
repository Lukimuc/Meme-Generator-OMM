import React, {useState, useEffect} from 'react'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {Meme} from '../../Home/Meme';

const Image_Form = ({push_image}) => {

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
            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_image(input_image)                       
            }}>Submit Image</Button>
        </div>
    );

}

export default Image_Form;