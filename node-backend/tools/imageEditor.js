const Jimp = require("jimp");

module.exports = class ImageEditor {
    constructor(buffer) {
        this.buffer = buffer;
    }

    static supportedFontSizes = [8, 10, 12, 14, 16, 32, 64, 128];
    static fontReferences = {
        8: Jimp.FONT_SANS_8_BLACK,
        10: Jimp.FONT_SANS_10_BLACK,
        12: Jimp.FONT_SANS_12_BLACK,
        14: Jimp.FONT_SANS_14_BLACK,
        16: Jimp.FONT_SANS_16_BLACK,
        32: Jimp.FONT_SANS_32_BLACK,
        64: Jimp.FONT_SANS_64_BLACK,
        128: Jimp.FONT_SANS_128_BLACK
    }

    async addCaptionsToBuffer(memeConfig) {
        return new Promise(async (resolve, _) => {
            Jimp.read(this.buffer)
                .then(img => {
                    let promiseArray = [];
                    memeConfig.forEach(async (config) => {
                        promiseArray.push(new Promise((resolve, _) => {
                            const fontSize = this.getSupportedFontSize(config.size);
                            Jimp.loadFont(ImageEditor.fontReferences[fontSize]).then((font) => {
                                img.print(font, config.x, config.y, config.text);
                                resolve();
                            });
                        }));
                    });
                    return Promise.all(promiseArray).then(() => {
                        return img;
                    });
                })
                .then((jimp) => {
                    jimp.getBufferAsync(Jimp.MIME_JPEG).then((image) => {
                        resolve(image);
                    });
                });
        });
    }

    getSupportedFontSize(providedSize) {
        if (ImageEditor.supportedFontSizes.includes(providedSize)) {
            return providedSize
        } else {
            return 32
        }
    }

}