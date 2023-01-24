var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    console.log("template: ", req.query.template, " bottomText: ", req.query.bottomText, " topText: ", req.query.topText);
    fetchMemeUrl(req.query.template)
        .then((url) => {
            console.log(url)
            fetch(url)
                .then((response) => response.blob())
                .then((imageBlob) => imageBlob.arrayBuffer())
                .then((buffer) => res.end(Buffer.from(buffer)))
        })
})

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
                            console.log(value);
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