require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "CineRate backend is running!",
  });
});

// Get movies
app.get("/api/movies", (req, res) => {
  res.json({
    message: "Movie API is working!",
    movies: [],
  });
});

// Add movie
app.post("/api/movies", (req, res) => {
  res.json({
    message: "Movie received!",
    movie: req.body,
  });
});

// Update movie
app.put("/api/movies/:id", (req, res) => {
  res.json({
    message: "Movie updated!",
    id: req.params.id,
    movie: req.body,
  });
});

// Delete movie
app.delete("/api/movies/:id", (req, res) => {
  res.json({
    message: "Movie deleted!",
    id: req.params.id,
  });
});

// Render uses its own PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});