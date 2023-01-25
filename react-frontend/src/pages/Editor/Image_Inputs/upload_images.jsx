import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react'


const Upload_Image = ({push}) => {

    const [imageUrl, setImageUrl] = useState('');

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadImage = async file => {
        const formData = new FormData();
        formData.append('file', file);
    
        // Connect to a seaweedfs instance
    };

    const helpPush = (src) => {
        console.log(src)
        push(src)
    }

    return (
        <div>
            <img src={imageUrl} alt="Image" />
            <br/>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={() => {console.log("Image wird gepushed"); push(imageUrl)}} > push </button>
        </div>
    )

}

export default Upload_Image;