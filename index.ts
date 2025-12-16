
import data from './menu.json';
import fs from "fs-extra";
import path from "path";
import { compressImageFromUrl, compressLocalImage } from './helper';

const OUTPUT_FOLDER = 'output'
const INPUT_FOLDER = 'input'

const productImageExists = (productId: string): boolean => {
  const files = fs.readdirSync(OUTPUT_FOLDER);
  return files.some((file) => file.startsWith(productId));
};

export const getMenuImagesToCompress = () => {
    console.log("hello world")
    const allmenus = data.menus || []
    const active = allmenus.filter(x => x && x.isActive)
    active.forEach(menu => {
      (menu?.products || []).forEach(async p => {
        const productId = p?.posId
        if(p?.imageUri && productId){
          if (productImageExists(productId)) {
            console.log(`Image for product ${productId} already exists. Skipping...`);
            return;
          }
          compressImageFromUrl(p.imageUri, OUTPUT_FOLDER, productId)
        }
      })
    })
}

export const compressImagesFromFolder = async (inputFolder: string = INPUT_FOLDER, outputFolder: string = OUTPUT_FOLDER) => {
  console.log(`Compressing images from ${inputFolder} to ${outputFolder}...`);
  
  // Create output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Check if input folder exists
  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder ${inputFolder} does not exist.`);
    return;
  }

  // Read all files from input folder
  const files = fs.readdirSync(inputFolder);
  
  // Filter for image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log(`No image files found in ${inputFolder}`);
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to compress`);

  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(inputFolder, file);
    const fileName = path.parse(file).name; // Get filename without extension
    
    try {
      console.log(`Processing: ${file}`);
      await compressLocalImage(inputPath, outputFolder, fileName);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log('Compression complete!');
}

// getMenuImagesToCompress()

compressImagesFromFolder();