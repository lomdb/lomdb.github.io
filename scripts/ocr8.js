import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import Tesseract from 'tesseract.js'

const args = process.argv.slice(2)
const language = args[0] || 'jpn'

// ------------------- Settings
const inputDir = './leaderboard'
const outputDir = path.join(inputDir, 'cropped')
const outputPath = path.join('leaderboard', 'data.js')

const imageExtensions = ['.png']

const blankAreas = [
  { left: 254, top: 0, width: 434 - 254, height: 2242, isWhite: true },
]

const cropRegion = {
  left: 116,
  top: 1110,
  width: 652 - 116,
  height: 1530 - 1110,
}

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

// ------------------- Block areas, crop region, and return output path
async function blockAreas(inputPath) {
  const baseImage = sharp(inputPath)

  const composites = await Promise.all(
    blankAreas.map(async area => {
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

  const processedBuffer = await baseImage
    .composite(composites)
    .grayscale()
    .linear(3.0, -130)
    .toBuffer()

  const outputFile = path.join(outputDir, path.basename(inputPath))

  await sharp(processedBuffer).extract(cropRegion).toFile(outputFile)

  return outputFile
}

// ------------------- Run OCR and return formatted blocks
async function runOCR(imagePath) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, language, {
      logger: m => console.log(`OCR (${path.basename(imagePath)}):`, m.status),
    })

    const date = new Date().toISOString().slice(0, 10)

    const blocks = text
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const match = line.match(/^(\d+)?\s*(.+)$/)
        if (!match) return null

        const [, row, name] = match
        const cleanName = name.replace(/\s+/g, '')
        return {
          position: +row || null,
          name: cleanName,
          date,
        }
      })
      .filter(Boolean)

    console.log(blocks)

    return blocks
  } catch (err) {
    console.error(`OCR failed for ${imagePath}:`, err)
    return []
  }
}

// ------------------- Write to file
function saveDataJS(data) {
  const sorted = data.sort(
    (a, b) => (a.position ?? 9999) - (b.position ?? 9999)
  )

  const blocks = sorted.map(
    ({ name, position, date }) => `
  user(['${name}'], 'AMEN_', '', [
    { rank: 'top', position: ${position}, date: '${date}' },
  ]),
`
  )

  const content = `import { user } from '../js/classes.js'

export default [
${blocks.join('\n')}
]
`

  fs.writeFileSync(outputPath, content, 'utf-8')
}

// ------------------- Main process
async function processAllImages() {
  const images = getImageFiles(inputDir).map(file => path.join(inputDir, file))
  const allEntries = []

  for (const image of images) {
    try {
      console.log(`Processing ${image}...`)
      const croppedPath = await blockAreas(image)
      const entries = await runOCR(croppedPath)
      allEntries.push(...entries)
    } catch (err) {
      console.error(`Failed to process ${image}:`, err)
    }
  }

  if (allEntries.length > 0) {
    saveDataJS(allEntries)
    console.log(`✅ Exported ${allEntries.length} entries to ${outputPath}`)
  } else {
    console.log('⚠️ No valid entries found.')
  }
}

processAllImages()
