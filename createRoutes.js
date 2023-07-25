const fs = require("fs");
const http = require("http");
const html = fs.readFileSync("./template/index.html", "utf-8");
const server = http.createServer((req, res) => {
  let path = req.url;
  //   res.end(path);
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.end("You are in home page");
  } else if (path.toLocaleLowerCase() === "/about") {
    res.end("You are in about page");
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.end("You are in contact page");
  } else {
    res.end("Error 404: Page Not Found");
  }
}); // callback function executes everytime the request hits the server

//STEP 2: Start a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
