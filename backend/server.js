require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CineRate backend is running!",
  });
});

app.get("/api/movies", (req, res) => {
  res.json({
    message: "Movie API is working!",
    movies: [],
  });
});

app.post("/api/movies", (req, res) => {
  res.json({
    message: "Movie received!",
    movie: req.body,
  });
});

app.put("/api/movies/:id", (req, res) => {
  res.json({
    message: "Movie updated!",
    id: req.params.id,
    movie: req.body,
  });
});

app.delete("/api/movies/:id", (req, res) => {
  res.json({
    message: "Movie deleted!",
    id: req.params.id,
  });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});