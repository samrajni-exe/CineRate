import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.5,
      review: "A beautiful and mind-blowing journey through space.",
      status: "Watched",
    },
    {
      id: 2,
      title: "Inception",
      genre: "Thriller",
      rating: 9,
      review: "A clever story with amazing visuals.",
      status: "Watched",
    },
    {
      id: 3,
      title: "Dune",
      genre: "Sci-Fi",
      rating: 8.5,
      review: "Epic world-building and stunning visuals.",
      status: "To Watch",
    },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");

  // ADD / UPDATE MOVIE
  const addMovie = async (e) => {
    e.preventDefault();

    if (!title || !genre || !rating) {
      alert("Please fill in title, genre and rating.");
      return;
    }

    try {
      // UPDATE MOVIE
      if (editingId) {
        const response = await fetch(
          `http://localhost:5001/api/movies/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              genre,
              rating,
              review,
            }),
          }
        );

        const data = await response.json();

        console.log("Updated:", data);

        setMovies(
          movies.map((movie) =>
            movie.id === editingId
              ? {
                  ...movie,
                  title,
                  genre,
                  rating,
                  review,
                }
              : movie
          )
        );

        setEditingId(null);
      }

      // ADD MOVIE
      else {
        const response = await fetch(
          "http://localhost:5001/api/movies",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              genre,
              rating,
              review,
            }),
          }
        );

        const data = await response.json();

        console.log("Added:", data);

        const newMovie = {
          id: Date.now(),
          title,
          genre,
          rating,
          review,
          status: "To Watch",
        };

        setMovies([...movies, newMovie]);
      }

      clearForm();
    } catch (error) {
      console.error("Backend error:", error);
      alert("Could not connect to the backend.");
    }
  };

  // CLEAR FORM
  const clearForm = () => {
    setTitle("");
    setGenre("");
    setRating("");
    setReview("");
  };

  // DELETE MOVIE
  const deleteMovie = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/movies/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("Deleted:", data);

      setMovies(movies.filter((movie) => movie.id !== id));

      if (editingId === id) {
        setEditingId(null);
        clearForm();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not connect to the backend.");
    }
  };

  // MARK WATCHED / TO WATCH
  const toggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              status:
                movie.status === "Watched"
                  ? "To Watch"
                  : "Watched",
            }
          : movie
      )
    );
  };

  // EDIT MOVIE
  const editMovie = (movie) => {
    setEditingId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
    setRating(movie.rating);
    setReview(movie.review);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // FILTER MOVIES
  const filteredMovies =
    filter === "All"
      ? movies
      : movies.filter((movie) => {
          if (filter === "Watched" || filter === "To Watch") {
            return movie.status === filter;
          }

          return movie.genre === filter;
        });

  return (
    <div className="app">
      {/* HEADER */}
      <header>
        <h1>🎬 CineRate</h1>
        <p>Track, rate and review your favourite movies.</p>
      </header>

      {/* ADD / EDIT FORM */}
      <section className="form-section">
        <h2>{editingId ? "Edit Movie" : "Add a Movie"}</h2>

        <form onSubmit={addMovie}>
          <input
            type="text"
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating / 10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="form-buttons">
            <button type="submit">
              {editingId ? "Update Movie" : "+ Add Movie"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  clearForm();
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* MOVIES */}
      <section className="movies-section">
        <div className="movies-heading">
          <h2>My Movies</h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Movies</option>
            <option value="Watched">Watched</option>
            <option value="To Watch">To Watch</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>

        <div className="movie-grid">
          {filteredMovies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            filteredMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="movie-top">
                  <h3>{movie.title}</h3>

                  <span className="rating">
                    ⭐ {movie.rating}
                  </span>
                </div>

                <p className="genre">{movie.genre}</p>

                <p>
                  {movie.review || "No review added yet."}
                </p>

                <span
                  className={
                    movie.status === "Watched"
                      ? "status watched"
                      : "status"
                  }
                >
                  {movie.status}
                </span>

                <div className="buttons">
                  <button onClick={() => editMovie(movie)}>
                    Edit
                  </button>

                  <button onClick={() => toggleWatched(movie.id)}>
                    {movie.status === "Watched"
                      ? "Mark To Watch"
                      : "Mark Watched"}
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;