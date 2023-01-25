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
            <TextField style={{paddingBottom:10}} label="Add text" type="text" value={url || ""} onChange={(e) => setUrl(e.target.value)}/>
            <br/>
            <button onClick={ () => {printImage()}}> PrintUrl </button>
            <button onClick={() => {console.log(url); push(url.props.src)}} > push </button>
        </div>
    )
}

export default Url;