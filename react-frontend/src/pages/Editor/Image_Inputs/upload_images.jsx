import React, {useState, useEffect} from 'react'


const Upload_Image = () => {

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
            <input type="file" onChange={handleFileSelect} />
        </div>
    )

}

export default Upload_Image;