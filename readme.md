# Sharp Image Optimization

A TypeScript tool for compressing and optimizing images using Sharp. Supports both URL-based image downloads and local file compression.

## Features

- Compress images from URLs (from menu.json)
- Compress all images from a local input folder
- Maintains original image format (JPEG, PNG, WebP, etc.)
- Auto-resizes images to max 800px width
- Preserves aspect ratio
- Quality optimization (80% default for lossy formats)

## Installation

```bash
yarn install
```

## Usage

### Option 1: Compress Images from Menu

1. Copy your menu data to `menu.json`

   Example menu structure:
   ```json
   {
       "menus": [
           {
               "isActive": true,
               "products": [
                   {
                       "posId": "sample",
                       "imageUri": "https://example.com/sample.png"
                   }
               ]
           }
       ]
   }
   ```

2. Update `index.ts` to call `getMenuImagesToCompress()`

3. Run:
   ```bash
   yarn build
   yarn start
   ```

### Option 2: Compress Images from Input Folder

1. Create an `input` folder in the project root
2. Place your images in the `input` folder
3. Update `index.ts` to call `compressImagesFromFolder()`
4. Run:
   ```bash
   yarn build
   yarn start
   ```

## Output

All compressed images will be saved in the `output` folder with their original filenames and formats.

## Supported Image Formats

- JPEG/JPG
- PNG
- WebP
- GIF
- BMP
- TIFF

## System Requirements

- Node.js >= 18.17.0
- Yarn 1.22.19+
- NVM 0.39.3+ (optional)

## Configuration

You can customize compression settings in `helper.ts`:
- `maxWidth`: Maximum width for resized images (default: 800px)
- `quality`: Compression quality for lossy formats (default: 80)
