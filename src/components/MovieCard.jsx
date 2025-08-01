import React from "react"
import "./MovieCard.css"

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h4>{movie.title}</h4>
    </div>
  )
}
