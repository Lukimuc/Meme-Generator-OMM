import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Url = ({push}) => {
    
    const [url, setUrl] = useState()

    const printImage = () => {
        setUrl(<img src={url} alt="Url - Image"/>)
    }
    return (
        <div>
            <p> Hier wird die Url bearbeitet</p>
            {url}
            <br/>
            <p> Beispielurl: https://konvajs.org/assets/lion.png </p>
            <TextField style={{paddingBottom:10}} label="Add text" type="text" value={url || ""} onChange={(e) => setUrl(e.target.value)}/>
            <br/>
            <Button variant="contained" onClick={ () => {printImage()}}> PrintUrl </Button>
            <Button variant="contained" onClick={() => {console.log(url); push(url.props.src)}} > push </Button>
        </div>
    )
}

export default Url;