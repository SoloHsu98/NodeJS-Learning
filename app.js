const readline = require("readline");
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.question("Please enter your name: ", (name) => {
  console.log("You entered:", name);
  r1.close(); //close interface after done
}); //call back function will execute when user enter the name and press enter

r1.on("close", () => {
  console.log("interface closed");
  process.exit(0);
}); //listen the close event and exit from the process
