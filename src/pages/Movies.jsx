import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFavorites } from "../context/FavoritesContext"
import { useNavigate } from "react-router-dom"
import placeholderImage from "../assets/placeholder.webp"
import "./Movies.css"

export default function Movies() {
  const { favorites, removeFromFavorites } = useFavorites()
  const navigate = useNavigate()

  return (
    <div className="favorites">
      <Header />
      <div className="favorites-page container">
        <h1 className="favorites-main-title">Your Favorite Movies</h1>
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="favorite-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  className="favorites-img"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : placeholderImage
                  }
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = placeholderImage
                  }}
                />
                <h3 className="movie-name">{movie.title}</h3>
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromFavorites(movie.id)
                  }}
                >
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
