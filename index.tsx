// const sharp = require('sharp');

import * as sharp from 'sharp'


// Replace with the path to your JPG file
const inputFilePath = 'source/image.jpeg';

// Function to convert the image
const convertImage = async (outputFormat: any):Promise<void> =>  {
  try {
    const image = await sharp(inputFilePath);
    const metadata = await image.metadata();

    // Choose output format and adjust quality as needed
    let outputBuffer;
    if (outputFormat === 'webp') {
      outputBuffer = await image.webp({ quality: 80 }); // Adjust quality between 0-100
    } else if (outputFormat === 'png') {
      outputBuffer = await image.png({ quality: 90 }); // Adjust quality between 0-100 (lossless)
    } else {
      throw new Error('Invalid output format. Supported formats: webp, png');
    }

    // Replace with the desired output path (including filename and extension)
    const outputFilePath = 'output/image.' + outputFormat;

    await outputBuffer.toFile(outputFilePath);
    console.log(`Image successfully converted to ${outputFormat} and saved to: ${outputFilePath}`);
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

// Example usage: convert to WebP
convertImage('webp');

// Example usage: convert to PNG (lossless)
convertImage('png');