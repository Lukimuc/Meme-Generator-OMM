import react from "react";
import {Link} from 'react-router-dom';
import ReactMarkdown from "react-markdown";

const HowTo = () => {
    return (
        <>
            <div style={{padding: "24px"}}>
                <h2> DO THIS BEFORE USING THIS WEBSITE</h2>

                <h3>Necessary to have the expected User Experience</h3>
                <ol>
                    <li>Use Google Chrome as browser - otherwise some features or pages will throw errors or won't
                        show
                    </li>
                    <li>Install the server.cert certificate for the HTTPS crypted stream - otherwise it's not possible
                        to reach the singleview
                    </li>
                    <li><Link to="/register">Register on the website - after that you're automatically logged in - your
                        data should be persistent on the mongoDB and can be reused</Link></li>
                    <li>Only logged in users can create and like memes as well as watch their personal profile</li>
                    <li>To delete a element in the meme editor use control as mac user or backspace + ctrl as windows
                        user
                    </li>
                </ol>

                <h3>Meme Creation API</h3>
                <ReactMarkdown>The API for creating memes is located under
                    GET:[http://localhost:3002/api/meme](http://localhost:3002/api/meme)</ReactMarkdown>
                <ReactMarkdown>You can use the API to create one or multiple memes using a specified
                    template.</ReactMarkdown>
                <ReactMarkdown>Templates are pulled from the Top100 memes of imgflip.com and can be referenced by their
                    name in this API:
                    [https://api.imgflip.com/get_memes](https://api.imgflip.com/get_memes)</ReactMarkdown>
                <ReactMarkdown>Supply the following URL-paramters to configure n-many memes:</ReactMarkdown>
                <ReactMarkdown>* `template: String`: The meme template name according to
                    https://api.imgflip.com/get_memes</ReactMarkdown>
                <ReactMarkdown>* `memes[0...(n-1)]: [CaptionConfig]`: The memes you want to create</ReactMarkdown>
                <ReactMarkdown>* `CaptionConfig: &#123;"text": String, "x": Int, "y": Int, "size": Int&#125;` :
                    Configuration for each meme caption</ReactMarkdown>
                <ReactMarkdown>* Possible font sizes: 8, 10, 12, 14, 16, 32, 64, 128</ReactMarkdown>
                <ReactMarkdown>#### Example:</ReactMarkdown>
                <ReactMarkdown>[http://localhost:3002/api/meme?template=Drake Hotline Bling&memes[0]=[&#123;"text":"Read
                    The Documentation","x":650,"y":300,"size":32&#125;,&#123;"text":"Just Ask ChatGPT","x":650,"y":850,
                    "size":64&#125;]&memes[1]=[&#123;"text":"Different
                    Memes","x":650,"y":300,"size":32&#125;,&#123;"text":"The Same Meme Again","x":650,"y":850,
                    "size":32&#125;]](http://localhost:3002/api/meme?template=Drake%20Hotline%20Bling&memes%5B0%5D=%5B%7B%22text%22:%22Read%20The%20Documentation%22,%22x%22:650,%22y%22:300,%22size%22:32%7D,%7B%22text%22:%22Just%20Ask%20ChatGPT%22,%22x%22:650,%22y%22:850,%20%22size%22:64%7D%5D&memes%5B1%5D=%5B%7B%22text%22:%22Different%20Memes%22,%22x%22:650,%22y%22:300,%22size%22:32%7D,%7B%22text%22:%22The%20Same%20Meme%20Again%22,%22x%22:650,%22y%22:850,%20%22size%22:32%7D%5D)</ReactMarkdown>

                <h3>Meme Retrieval API</h3>
                <ReactMarkdown>The API for retrieving memes is located under
                    GET:[http://localhost:3002/api/search](http://localhost:3002/api/search)</ReactMarkdown>
                <ReactMarkdown>You can use the API to search and download existing memes in the database.</ReactMarkdown>
                <ReactMarkdown>Just calling the API without parameters returns the ten latest public memes in descending order.</ReactMarkdown>
                <ReactMarkdown>The following optional URL-parameters can be used to refine the search:</ReactMarkdown>
                <ReactMarkdown>* `title: String`: A string the title of the meme must contain</ReactMarkdown>
                <ReactMarkdown>* `order: String`: The order of the memes sorted by the time of creation. Can either be `ascending` or `descending`. Default is `descending`</ReactMarkdown>
                <ReactMarkdown>* `creator: String`: The mail-address of the creator of the meme</ReactMarkdown>
                <ReactMarkdown>* `limit: Int`: The maximum number of memes that should be returned</ReactMarkdown>
                <ReactMarkdown>#### Example:</ReactMarkdown>
                <ReactMarkdown>[http://localhost:3002/api/search?title=ChatGPT&order=ascending&creator=test@gmail.com&limit=2](http://localhost:3002/api/search?title=ChatGPT&order=ascending&creator=test%40gmail.com&limit=2)</ReactMarkdown>
            </div>
        </>
    )
}
export default HowTo;
