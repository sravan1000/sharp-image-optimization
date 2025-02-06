
import data from './menu.json';
import fs from "fs-extra";
import { compressImageFromUrl } from './helper';

const OUTPUT_FOLDER = 'output'

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

getMenuImagesToCompress()