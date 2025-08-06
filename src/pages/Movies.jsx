import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Movies.css"

export default function Movies() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <div className="favorites">
      <Header />

      <div className="favorites-page">
        <h1>Your Favorite Movies</h1>
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div key={movie.id} className="favorite-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />

                <h3 className="movie-name">{movie.title}</h3>
                <button className="remove-btn" onClick={() => removeFromFavorites(movie.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
