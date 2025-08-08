import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFavorites } from "../context/FavoritesContext"
import "./Movies.css"

export default function Movies() {
  const { favorites, removeFromFavorites } = useFavorites()

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
