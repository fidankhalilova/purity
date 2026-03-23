const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (inputPath, outputPath, options = {}) => {
    const {
        width = 800,
        height = null,
        quality = 80,
        format = 'webp'
    } = options;

    try {
        let image = sharp(inputPath);

        // Resize if width specified
        if (width) {
            image = image.resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Set format and quality
        if (format === 'webp') {
            image = image.webp({ quality });
        } else if (format === 'jpeg') {
            image = image.jpeg({ quality });
        } else if (format === 'png') {
            image = image.png({ quality });
        }

        await image.toFile(outputPath);

        // Delete original file
        fs.unlinkSync(inputPath);

        return outputPath;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};

const generateThumbnail = async (inputPath, outputPath) => {
    try {
        await sharp(inputPath)
            .resize(200, 200, {
                fit: 'cover',
                position: 'centre'
            })
            .webp({ quality: 70 })
            .toFile(outputPath);

        return outputPath;
    } catch (error) {
        console.error('Error generating thumbnail:', error);
        throw error;
    }
};

module.exports = {
    processImage,
    generateThumbnail
};