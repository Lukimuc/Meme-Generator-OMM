const express = require('express');
const {findMemesInDB} = require('../../tools/dbApiSearch');
const {zipBuffers} = require("../../tools/imageZipper");
const {createJpegBuffersFromMemes} = require("../../tools/imageConverter");

const router = express.Router();

router.get('/', (req, res) => {
    findMemesInDB(req)
        .then((memes) => {
           createJpegBuffersFromMemes(memes)
               .then((buffers) => {
                   zipBuffers(buffers, res)
                       .then((archive) => res.status(200).end(archive));
               })
        });
})

module.exports = router;