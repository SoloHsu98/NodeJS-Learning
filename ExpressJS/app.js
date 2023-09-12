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

app.get("/api/v1/movies/:id", (req, res) => {
  const id = req.params?.id * 1;

  let movie = movies.find((el) => el.id === id);

  if (!movie) {
    res.status(404).json({
      status: "Not Found",
      message: "Movie with ID " + id + " is not found",
    });
  }
  res.status(200).json({
    status: 200,
    data: {
      movie: movie,
    },
  });
}); //:means that specifies this ID is a route parameter, ? means this route parameter is optional

app.post("/api/v1/movies", (req, res) => {
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

app.patch("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;

  let movie = movies?.find((el) => el.id === id);

  if (!movie) {
    return res.status(404).json({
      status: 404,
      message: "No movie object with ID " + id + " is found",
    });
  }
  let index = movies.indexOf(movie);

  Object.assign(movie, req.body); // obj နှစ်ခုမတူရင် နှစ်ခုလုံးစီကယူပြီးတစ်ခုတည်းဖြစ် obj နှစ်ခု property တူတယ်ဆိုရင် sec obj ရဲ့ updated value ကိုယူ

  movies[index] = movie;
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movie,
      },
    });
  });
});
const port = 3002;
app.listen(port, () => {
  console.log("Server has started");
});
