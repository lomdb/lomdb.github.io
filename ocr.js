import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import Tesseract from 'tesseract.js'

// ------------------- Settings
const inputDir = './leaderboard'
const outputDir = path.join(inputDir, 'cropped')

const imageExtensions = ['.png']

const blankAreas = [
  { left: 251, top: 0, width: 465 - 249, height: 2400, isWhite: true },
  { left: 0, top: 0, width: 152, height: 2400 },
  { left: 0, top: 0, width: 1080, height: 1208 },
  { left: 705, top: 0, width: 1080 - 705, height: 2400 },
  { left: 0, top: 1625, width: 1080, height: 2400 },
]

// ------------------- Utility: Get image files
function getImageFiles(dir) {
  return fs.readdirSync(dir).filter(file => {
    const ext = path.extname(file).toLowerCase()
    return imageExtensions.includes(ext)
  })
}

// ------------------- Ensure cropped folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

// ------------------- Block areas and return output path
async function blockAreas(inputPath) {
  const outputPath = path.join(outputDir, path.basename(inputPath))

  const composites = await Promise.all(
    blankAreas.map(async area => {
      const isWhiteArea =
        area.left === 251 && area.top === 0 && area.width === 465 - 249

      const buffer = await sharp({
        create: {
          width: area.width,
          height: area.height,
          channels: 4,
          background: area.isWhite
            ? { r: 255, g: 255, b: 255, alpha: 1 }
            : { r: 0, g: 0, b: 0, alpha: 1 },
        },
      })
        .png()
        .toBuffer()

      return { input: buffer, top: area.top, left: area.left }
    })
  )

  await sharp(inputPath)
    .composite(composites)
    .grayscale()
    .linear(4.0, -160)
    // .threshold(150)
    .toFile(outputPath)

  return outputPath
}

// ------------------- Run OCR
async function runOCR(imagePath) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'jpn', {
      logger: m => console.log(`OCR (${path.basename(imagePath)}):`, m.status),
    })
    console.log(
      `\n[${path.basename(imagePath)}] Extracted Text:\n${text
        .trim()
        .split('\n')}\n`
    )
  } catch (err) {
    console.error(`OCR failed for ${imagePath}:`, err)
  }
}

// ------------------- Process all images
async function processAllImages() {
  const images = getImageFiles(inputDir).map(file => path.join(inputDir, file))

  for (const image of images) {
    try {
      console.log(`Processing ${image}...`)
      const croppedPath = await blockAreas(image)
      await runOCR(croppedPath)
    } catch (err) {
      console.error(`Failed to process ${image}:`, err)
    }
  }
}

processAllImages()
