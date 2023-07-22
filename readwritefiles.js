const readline = require("readline");
const fs = require("fs");
let text = fs.readFileSync("./files/input.txt", "utf-8"); //read file synchronously
console.log("text", text);

let content = `Data read from input.txt: ${text} \nDate created ${new Date()}`;
fs.writeFileSync("./files/output.txt", content);
fs.writeFileSync("./files/output1.txt", content); //without creating output1.txt node js will create one for you
