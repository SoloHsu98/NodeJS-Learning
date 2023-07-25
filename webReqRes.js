const fs = require("fs");
const http = require("http");
const html = fs.readFileSync("./template/index.html", "utf-8");
const server = http.createServer((req, res) => {
  res.end(html);
  console.log("A new request received");
}); // callback function executes everytime the request hits the server

//STEP 2: Start a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
