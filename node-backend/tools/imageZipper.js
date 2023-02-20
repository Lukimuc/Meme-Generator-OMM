const archiver = require("archiver");

async function zipBuffers(buffers, res, customNames = false) {
    return new Promise((resolve, _) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const zipData = [];
    res.setHeader('Content-Disposition', 'attachment; filename="memes.zip"');

    archive.on('data', function (chunk) {
        zipData.push(chunk);
    });

    archive.on('end', function() {
        const result = Buffer.concat(zipData);
        console.log("Finished compressing memes, sending archive now");
        resolve(result);
    })

    for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        const name = customNames ? `${buffer[1]}.jpeg` : `meme-${i}.jpeg`
        const meme = customNames ? buffer[0] : buffer
        archive.append(meme, { name: name});
    }

    archive.finalize();
    });
}

module.exports.zipBuffers = zipBuffers;