const Jimp = require("jimp");

async function addCaptionToImage(buffer) {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const image = Jimp.read(buffer)
        .then(img => {
            return img
                .print(font, 10, 10, 'Hello World!');
        });
    return (await image).getBufferAsync(Jimp.MIME_JPEG)

}
module.exports = {
    addCaptionToImage: function (buffer) {
        return addCaptionToImage(buffer)
    }
}