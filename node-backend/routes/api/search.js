const express = require('express');
const {findMemesInDB} = require('../../tools/dbApiSearch');
const {zipBuffers} = require("../../tools/imageZipper");

const router = express.Router();

router.get('/', (req, res) => {
    findMemesInDB(req)
        .then((result) => {
            const imageBuffers = result.filter((entry) => entry['image_encoded'] !== null) .map((meme) => {
                return convertDataUrlToImageBuffer(meme['image_encoded'])
            })
            zipBuffers(imageBuffers, res)
                .then((archive) => res.end(archive));
        });
    //res.status(200).send();
})

function convertDataUrlToImageBuffer(dataUrl) {
    const parts = dataUrl.split(",");
    const data = parts[1];

    const buffer = Buffer.from(data, 'base64');
    return buffer;
}


module.exports = router;