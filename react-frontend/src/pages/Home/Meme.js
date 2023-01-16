import React from 'react';
import { useState, useEffect } from 'react';
import Singleview from '../Singleview/singleview';
/*taking Image and putting it into a Meme Component*/
export const Meme=({template, onClick, width, height, ...props}) => {
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(x => x.json()
        .then(response => setTemplates(response.data.memes))
        );
      }, []);
const [templates, setTemplates] = useState([]);
/*const [template, setTemplate] = useState(null);*/
/*template &&*/
    return(
        <>
        <img style={{maxHeight: 350, width: width, height:height}}
        src={template.url}
        title={template.name}
        onClick={onClick}
        />
      {/*}  <Singleview template={props.template} />*/}
        </> )
}