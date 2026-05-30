const fs=require("fs")

const filePath="./subgenres.json"
let content=fs.readFileSync(filePath,"utf8")

content=content.replace(/\?si=[^"]*/g,"")

fs.writeFileSync(filePath,content,"utf8")

console.log("Done")