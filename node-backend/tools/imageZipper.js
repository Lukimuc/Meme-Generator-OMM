const archiver = require("archiver");

async function zipBuffers(buffers, res) {
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
        archive.append(buffer, { name: `meme-${i}.jpg`});
    }

    archive.finalize();
    });
}

module.exports.zipBuffers = zipBuffers;