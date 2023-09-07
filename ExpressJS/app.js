const express = require("express");
const fs = require("fs");
let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));
// route = http method + url
app.use(express.json()); // middleware => stand between req and res, add req body to req obj
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies?.length,
    data: { movies: movies },
  }); //send as JSend format and make enveloping
});

app.post("/api/v1/movies", (req, res) => {
  console.log("req", req.body);
  const newId = movies[movies?.length - 1]?.id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
});
const port = 3002;
app.listen(port, () => {
  console.log("Server has started");
});
