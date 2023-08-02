const http = require("http");
const fs = require("fs");
const server = http.createServer();

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});

// server.on("request", (req, res) => {
//   fs.readFile("./files/large-file.txt", (err, data) => {
//     if (err) {
//       res.end("Something went wrong!");
//       return;
//     }
//     res.end(data);
//   });
// }); // This can cause apps crash

server.on("request", (req, res) => {
  let part = 0;
  let rs = fs.createReadStream("./files/large-file.txt");
  rs.on("data", (chunk) => {
    res.write(chunk);
    part += 1;
    res.end(`There is ${part} chunks`);
  });
  res.on("error", (error) => {
    res.end(error.message);
  });
});
