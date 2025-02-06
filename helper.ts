import sharp from "sharp";
import axios from "axios";
import fs from "fs";
import path from "path";

/**
 * Downloads an image from a URL and returns it as a buffer.
 * @param imageUrl Public URL of the image.
 * @returns Buffer of the downloaded image.
 */
async function downloadImage(imageUrl: string): Promise<Buffer> {
  const response = await axios({
    url: imageUrl,
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary");
}

/**
 * Compress an image while maintaining its original format.
 * @param imageUrl URL of the image.
 * @param outputDir Directory to save the compressed image.
 * @param maxWidth Maximum width of the resized image.
 * @param quality Compression quality (1-100, applicable for lossy formats).
 */
export async function compressImageFromUrl(
  imageUrl: string,
  outputDir: string,
  fileName: string,
  maxWidth: number = 800,
  quality: number = 80
): Promise<void> {
  try {
    console.log(`Downloading image from: ${imageUrl}`);
    const imageBuffer = await downloadImage(imageUrl);

    // Detect image format
    const metadata = await sharp(imageBuffer).metadata();
    const format = metadata.format; // Get original format (jpeg, png, webp, etc.)

    if (!format) {
      throw new Error("Could not determine image format");
    }

    // Generate output file path
    const fileExtension = format === "jpeg" ? "jpg" : format; // Ensure correct extension
    const outputPath = path.join(outputDir, `${fileName}.${fileExtension}`);

    console.log(`Processing image...`);
    await sharp(imageBuffer)
      .rotate() // Auto-orient based on EXIF metadata
      .resize({ width: maxWidth, withoutEnlargement: true }) // Resize while keeping aspect ratio
      .toFormat(format, format === "jpeg" || format === "webp" ? { quality } : {}) // Apply quality only for lossy formats
      .toFile(outputPath);

    console.log(`Image saved at: ${outputPath}`);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

// // Example Usage
// const imageUrl = "https://example.com/sample.png"; // Replace with actual image URL
// const outputDirectory = __dirname; // Save in the current directory

// compressImageFromUrl(imageUrl, outputDirectory, 800, 80);
