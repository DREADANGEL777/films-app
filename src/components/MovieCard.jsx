import React from "react"
import { useNavigate } from "react-router-dom"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useFavorites } from "../context/FavoritesContext"
import placeholderImage from "../assets/placeholder.webp"
import "./MovieCard.css"

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavorite = (e) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <div className="movie-card-detail" onClick={handleClick}>
      <img
        className="movie-img-detail"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : placeholderImage
        }
        alt={movie.title}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = placeholderImage
        }}
      />
      <h4>{movie.title}</h4>
      <button className="favorites-btn-detail" onClick={handleFavorite}>
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="red" />}
      </button>
    </div>
  )
}
