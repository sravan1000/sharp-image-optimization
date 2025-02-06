
import data from './menu.json';
import { compressImageFromUrl } from './helper';

export const getMenuImagesToCompress = () => {
    console.log("hello world")
    const allmenus = data.menus || []
    const active = allmenus.filter(x => x && x.isActive)
    active.forEach(menu => {
      (menu?.products || []).forEach(async p => {
        if(p?.imageUri && p.posId){
          compressImageFromUrl(p.imageUri, `output`, p.posId)
        }
      })
    })
}

getMenuImagesToCompress()