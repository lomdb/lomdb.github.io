import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import Tesseract from 'tesseract.js'

// ------------------- Settings
const inputDir = './leaderboard'
const outputDir = path.join(inputDir, 'cropped')
const outputPath = path.join('leaderboard', 'data.js')

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
  const outputFile = path.join(outputDir, path.basename(inputPath))

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

  await sharp(inputPath)
    .composite(composites)
    .grayscale()
    .linear(4.0, -160)
    .toFile(outputFile)

  return outputFile
}

// ------------------- Run OCR and return formatted blocks
async function runOCR(imagePath) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'jpn', {
      logger: m => console.log(`OCR (${path.basename(imagePath)}):`, m.status),
    })

    const date = new Date().toISOString().slice(0, 10)

    const blocks = text
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const match = line.match(/^(\d+)\s+(.+)$/)
        if (!match) return null

        const [, row, name] = match
        const cleanName = name.replace(/\s+/g, '')
        return {
          position: parseInt(row, 10),
          name: cleanName,
          date,
        }
      })
      .filter(Boolean)

    return blocks
  } catch (err) {
    console.error(`OCR failed for ${imagePath}:`, err)
    return []
  }
}

// ------------------- Write to file
function saveDataJS(data) {
  const sorted = data.sort((a, b) => a.position - b.position)

  const blocks = sorted.map(
    ({ name, position, date }) => `  [
    user(['${name}'], 'JP_', '', [
      { rank: 'top', position: ${position}, date: '${date}' },
    ]),
  ]`
  )

  const content = `import { user } from '../js/classes.js'

export default [
${blocks.join(',\n')}
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
