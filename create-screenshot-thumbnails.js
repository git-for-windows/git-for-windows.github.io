const fs = require('fs')
const jimp = require('jimp')

const generateThumbnail = async (inputPath, width, height, outputPath) => {
  console.log(`Generating ${outputPath}`)
  const image = await jimp.read(inputPath)
  image.resize(width, height).write(outputPath)
}

(async () => {
  for (const file of await fs.promises.readdir('img/')) {
    const match = file.match(/^(gw\d+)\.png$/)
    if (match) {
      await generateThumbnail(`img/${match[1]}.png`, 315, 239, `img/${match[1]}web_thumb.png`)
    }
  }
})().catch(console.log)
