//exifEditor
const piexif = require('piexifjs');
const sharp = require('sharp');
function readExif(buffer) {
    sharp(buffer)
        .jpeg()
        .toBuffer()
        .then((jpegBuffer) => {
            const dataUrl = `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`
            console.log(dataUrl);
            const exifData = piexif.load(dataUrl);
            console.log(exifData);
        })

}

module.exports.readExif = readExif;