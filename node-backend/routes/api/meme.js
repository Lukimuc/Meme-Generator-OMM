const express = require('express');
const ImageEditor = require("../../tools/imageEditor");
const router = express.Router();
const archiver = require('archiver');
const zlib = require("zlib");

router.get("/", function (req, res) {
    console.log("Received API call")
    fetchMemeUrl(req.query.template)
        .then((url) => {
            fetch(url)
                .then((response) => response.blob())
                .then((imageBlob) => imageBlob.arrayBuffer())
                .then((buffer) => {
                    const imageEditor = new ImageEditor(buffer);
                    const memeConfigs = parseMemesFromReq(req)
                    console.log("Create", memeConfigs.length, "memes for template ", req.query.template);
                    let editorPromises = memeConfigs.map(async (memeConfig) => {
                        return imageEditor
                            .addCaptionsToBuffer(memeConfig)
                    })
                    Promise.all(editorPromises)
                        .then(results => {
                            compressBuffers(results, res);
                        })
                        .catch(e => {
                            console.error(e);
                        });
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

function compressBuffers(buffers, res) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const zipData = [];

    res.setHeader('Content-Disposition', 'attachment; filename="memes.zip"');

    archive.on('data', function (chunk) {
        zipData.push(chunk);
    });

    archive.on('end', function() {
        const result = Buffer.concat(zipData);
        res.end(result);
    })

    for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        archive.append(buffer, { name: `meme-${i}.jpg`});
    }

    archive.finalize();
}

module.exports = router;