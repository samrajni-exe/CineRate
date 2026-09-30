# 🎬 CineRate

CineRate is a full-stack movie review and tracking application built using React and Node.js/Express.

## Features

- Add movies
- View movie cards
- Edit movies
- Delete movies
- Mark movies as Watched / To Watch
- Filter movies by genre
- Filter movies by watching status
- Add ratings and reviews

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Database
- MongoDB Atlas

## Project Structure

```text
CineRate/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md

```

## API Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/movies` | Get movies |
| POST | `/api/movies` | Add a movie |
| PUT | `/api/movies/:id` | Update a movie |
| DELETE | `/api/movies/:id` | Delete a movie |

## Running the Project

### Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5001
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Future Improvements

- Connect movie data permanently to MongoDB
- Add movie poster images
- Add watched dates
- Improve filtering
- Add user authentication
- Deploy the application
