//dbApiSearch.js
function findMemesInDB(req) {
    let searchParams = {};
    let sortParams = {};
    let limit = 10;

    searchParams['status'] = {$ne: 'private'};

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

module.exports.findMemesInDB = findMemesInDB