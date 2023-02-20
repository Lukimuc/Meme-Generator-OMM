//imageConverter
const sharp = require('sharp');

async function createJpegBuffersFromMemes(memes) {
    return new Promise((resolve) => {
       let promises = memes.filter((meme) => meme['image_encoded'] !== null).map((meme) => {
           return exifBufferFromMeme(meme)
        })
        Promise.all(promises)
            .then(results => {
               resolve(results)
            })
    })
}

async function exifBufferFromMeme(meme) {
    const buffer = convertDataUrlToImageBuffer(meme['image_encoded'])
    return sharp(buffer)
        .jpeg()
        .withMetadata({
            exif: {
                IFD0: {
                    ImageDescription: meme['imageDescription'],
                    Artist: meme['CreatorMail'],
                    Software: "MemeGenerator v1"
                },
                Exif: {
                    DateTimeOriginal: meme['memeCreated'].toString()
                }
            }
        })
}
function convertDataUrlToImageBuffer(dataUrl) {
    const parts = dataUrl.split(",");
    const data = parts[1];

    const buffer = Buffer.from(data, 'base64');
    return buffer;
}

module.exports.createJpegBuffersFromMemes = createJpegBuffersFromMemes;