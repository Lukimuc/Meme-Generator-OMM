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

    return (
        <div>
            <img src={imageUrl} alt="Image" />
            <br/>
            <Button variant="contained" component="label">
                Upload
                <input hidden multiple type="file" onChange={handleFileSelect}/>
            </Button> <br/>
            <Button variant="contained" onClick={() => {console.log("Image wird gepushed"); push(imageUrl)}} > push </Button>
        </div>
    )

}

export default Upload_Image;