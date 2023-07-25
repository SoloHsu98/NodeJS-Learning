const http = require("http");
//STEP 1: Create a server
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
  console.log("A new request received");
  console.log("request", req);
}); // callback function executes everytime the request hits the server

//STEP 2: Start a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
