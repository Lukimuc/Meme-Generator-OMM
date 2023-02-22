const express = require('express');
const {findMemesInDB} = require('../../tools/dbApiSearch');
const {zipBuffers} = require("../../tools/imageZipper");
const {createJpegNameBuffersFromMemes} = require("../../tools/imageConverter");

const router = express.Router();

router.get('/', (req, res) => {
    findMemesInDB(req)
        .then((memes) => {
            if (memes.length === 0) {
                res.send("No memes found for specified parameters.")
                return;
            }
           createJpegNameBuffersFromMemes(memes)
               .then((nameBuffers) => {
                   zipBuffers(nameBuffers, res, true)
                       .then((archive) => res.status(200).end(archive));
               })
        });
})

module.exports = router;