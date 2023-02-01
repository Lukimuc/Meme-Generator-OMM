const Jimp = require("jimp");

module.exports = class ImageEditor {
    constructor(buffer) {
        this.buffer = buffer;
    }

    async addCaptionsToBuffer(memeConfig) {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const image = Jimp.read(this.buffer)
            .then(img => {
                memeConfig.forEach((config) => {
                    img.print(font, config.x, config.y, config.text);
                })
                return img;
            })
        return (await image).getBufferAsync(Jimp.MIME_JPEG);
    }
}