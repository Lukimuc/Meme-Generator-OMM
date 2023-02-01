const express = require('express');
const url = require("url");
const ImageEditor = require("../../tools/imageEditor");
const router = express.Router();

router.get("/", function (req, res) {
    fetchMemeUrl(req.query.template)
        .then((url) => {
            console.log(url)
            fetch(url)
                .then((response) => response.blob())
                .then((imageBlob) => imageBlob.arrayBuffer())
                .then((buffer) => {
                    const imageEditor = new ImageEditor(buffer);
                    let result = parseMemesFromReq(req).map(async (meme) => {
                        return imageEditor
                            .addCaptionToImage()
                    })
                    Promise.all(result)
                        .then(results => {
                            res.end(results[0]);
                        })
                        .catch(e => {
                            console.error(e);
                        })
                })
        })
})

function parseMemesFromReq(req) {
    const memes = req.query.memes;
    let parsedMemes = [];
    for (let i = 0; i < memes.length; i++) {
        const meme = memes[i]
        parsedMemes.push(JSON.parse(meme));
    }
    return parsedMemes;
}

let fetchMemeUrl = function (template) {
    return new Promise((resolve, reject) => {
        fetch("https://api.imgflip.com/get_memes")
            .then((result) => {
                return result.json()
            })
            .then(
                (data) => {
                    const memes = data.data.memes;
                    const url = Object.entries(memes)
                        .filter(([_, value]) => {
                            return value.name === template;
                        })
                        .map(([_, value]) => value.url)
                    resolve(url[0])
                },
                (error) => {
                    reject(error);
                }
            )
    })
}

module.exports = router;