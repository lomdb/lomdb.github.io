import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const localDir = './leaderboard'
const devicePath = '/sdcard/screen.png'

// Ensure screenshots directory exists
if (!fs.existsSync(localDir)) {
  fs.mkdirSync(localDir)
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const localFile = path.join(localDir, `screenshot-${timestamp}.png`)

try {
  console.log('📸 Taking screenshot on device...')
  execSync(`adb shell screencap -p ${devicePath}`)

  console.log('⬇️ Pulling screenshot to local directory...')
  execSync(`adb pull ${devicePath} ${localFile}`)

  console.log('🧹 Cleaning up device screenshot...')
  execSync(`adb shell rm ${devicePath}`)

  console.log(`✅ Screenshot saved to: ${localFile}`)
} catch (err) {
  console.error('❌ Failed to take screenshot:', err.message)
}