const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    console.log(req.mongoClient);
    findMemesInDB(req)
        .then((res) => console.log(res));
    res.status(200).send();
})

async function findMemesInDB(req) {
    let searchParams = {};
    let sortParams = {};
    let limit = 10;

    console.log(req.query);
    if (req.query.title) {
        searchParams['title'] = {$regex: req.query.title, $options: 'i'};
    }

    if (req.query.creator) {
        searchParams['CreatorMail'] = req.query.creator;
    }

    if (req.query.order === "ascending") {
        sortParams['memeCreated'] = 1;
    } else {
        sortParams['memeCreated'] = -1;
    }

    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    return req.mongoDB.collection('memes').find(searchParams).sort(sortParams).limit(limit).toArray();
}

module.exports = router;