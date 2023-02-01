const Jimp = require("jimp");

module.exports = class ImageEditor {
    constructor(buffer) {
        this.buffer = buffer;
    }
    async addCaptionToImage() {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const image = Jimp.read(this.buffer)
            .then(img => {
                return img
                    .print(font, 10, 10, 'Hello World!');
            });
        return (await image).getBufferAsync(Jimp.MIME_JPEG)
    }
}