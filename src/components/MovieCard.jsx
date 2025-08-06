import React from "react"
import { useNavigate } from "react-router-dom"
import "./MovieCard.css"

export default function MovieCard({ movie }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }
  
  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h4>{movie.title}</h4>
    </div>
  )
}
