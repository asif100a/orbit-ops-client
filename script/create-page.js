/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const firstArg = process.argv[2];
const secondArg = process.argv[3];

if(!firstArg) {
    console.log("Usage: node utils/create-page.js <folder> <file>");
    console.log("   or: node utils/create-page.js <folder>/<file>");
    process.exit(1);
}

const folderName = secondArg ? firstArg : path.dirname(firstArg);
const fileName = secondArg || path.basename(firstArg);
const folderPath = path.join(process.cwd(), folderName)

if(!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive: true})
}

const filePath = path.join(folderPath, fileName);
const componentName = path
    .basename(fileName, path.extname(fileName))
    .replace(/[^a-zA-Z0-9_$]/g, '')
    .replace(/^[a-z]/, (letter) => letter.toUpperCase());

const content = `import React from 'react'

export default function ${componentName}() {
  return(
    <div>${componentName}</div>
  )
}`

fs.writeFileSync(filePath, content);

console.log(`Created ${folderName}/${fileName}`)
