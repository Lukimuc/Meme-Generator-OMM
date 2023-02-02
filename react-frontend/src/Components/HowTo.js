import react from "react";
import { Link } from 'react-router-dom';

const HowTo = () => {

    return (
        <>
            <h3> DO THIS BEFORE USING THIS WEBSITE</h3>

            <h4>Necessary to have the expected User Experience</h4>
            <ol>
                <li>Use Google Chrome as browser - otherwise some features or pages will throw errors or won't show</li>
                <li>Install the server.cert certificate for the HTTPS crypted stream - otherwise it's not possible to reach the singleview </li>
                <li><Link to="/register">Register on the website - after that you're automatically logged in - your data should be persistent on the mongoDB and can be reused</Link></li>
                <li>Only logged in users can create and like memes as well as watch their personal profile </li>
                <li>To delete a element in the meme editor use control as mac user or backspace + ctrl as windows user </li>
            </ol>

            <h4>For the Meme creation via API</h4>
            <ol>
                <li></li>
            </ol>
        </>
    )
}
export default HowTo;
