import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Text_Form = ({push_text, count}) => {

    const [input_text, setInputs_Text] = useState()
    const [counter, setCounter] = useState(count)

    return(
        <div>
            <p>Choose your text and meme template and check in your desired text and images with the "submit" button afterwards!</p>
            <TextField style={{paddingBottom:10}} label="Add text" type="text" value={input_text || ""} onChange={(e) => setInputs_Text(e.target.value)}/>
            <br/>
            <Button variant="contained" onClick={(e) => {
                e.preventDefault();
                push_text(
                    {
                        text:input_text,
                        fontFamily:"Arial",
                        fontStyle:"bolt",
                        fill:"orange",
                        counter: counter
                    }
                )
                setCounter(counter + 1)
            }}>Submit Text</Button>
        </div>
    );

}

export default Text_Form;