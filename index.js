const hummus = require('hummus')
const fs = require('fs')

/* source file is exist? */
const sourcePdfPath = process.argv[2] || 'source.pdf'
if (!fs.existsSync(sourcePdfPath)) {
  console.log('File is not exist')
  process.exit(1)
}

/* count pages */
const pdfReader = hummus.createReader(sourcePdfPath)
const pagesCount = pdfReader.getPagesCount()

/* get writer */
const pdfWriter = hummus.createWriterToModify(sourcePdfPath, {
  modifiedFilePath: __dirname + (process.argv[3] || '/output.pdf')
})

/* write page number */
for (let i = 0; i < pagesCount; i++) {
  const pageModifier = new hummus.PDFPageModifier(pdfWriter, i)
  pageModifier.startContext().getContext().writeText(
    `${i+1}/${pagesCount}`, /* write content */
    10, 10, /* x, y */
    {
      font: pdfWriter.getFontForFile(__dirname + '/Roboto-Light.ttf'),
      size: 12,
      colorspace: 'gray',
      color: 0x00
    }
  )
  pageModifier.endContext().writePage()
}

pdfWriter.end()
