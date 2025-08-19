import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import placeholderImage from "../assets/placeholder.webp"
import "./MovieDetails.css"
import Loader from "../components/Loader"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState("")
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  })

  const API_KEY = import.meta.env.VITE_API_KEY

  const isFavorite = movie && favorites.some((m) => m.id === movie.id)

  const toggleFavorite = () => {
    if (!movie) return
    const updated = isFavorite ? favorites.filter((m) => m.id !== movie.id) : [...favorites, movie]
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        setError("Failed to load movie details")
      }
    }
    fetchMovie()
  }, [id])

  if (error) return <div>{error}</div>
  if (!movie) return <Loader />

  return (
    <div className="movie-detail">
      <Header />
      <div className="movie-detail-inner">
        <div className="movie-cont-1">
          <img
            className="movie-detail-img"
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : placeholderImage
            }
            alt={movie?.title || "No title"}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = placeholderImage
            }}
          />
          <h2 className="movie-title">{movie.title}</h2>
        </div>

        <div className="movie-cont-2">
          {movie?.overview ? (
            <p className="text description">{movie.overview}</p>
          ) : (
            <p className="text">Overview: Data don't exist</p>
          )}

          <p className="text country">
            <span className="white-span">Origin country:</span>{" "}
            {movie?.production_countries?.length > 0
              ? movie.production_countries.map((c) => c.name).join(", ")
              : "Data don't exist"}
          </p>

          <p className="text mark">
            <span className="white-span">Mark:</span>{" "}
            {movie?.vote_average ? movie.vote_average : "Data don't exist"}
          </p>

          <p className="text tags">
            <span className="white-span">Tags:</span>{" "}
            {movie?.tagline ? movie.tagline : "Data don't exist"}
          </p>

          <p className="text release">
            <span className="white-span">Released:</span>{" "}
            {movie?.release_date ? movie.release_date : "Data don't exist"}
          </p>

          <p className="text genres">
            <span className="white-span">Genres:</span>{" "}
            {movie?.genres?.length > 0
              ? movie.genres.map((g) => g.name).join(", ")
              : "Data don't exist"}
          </p>

          <p className="text runtime">
            <span className="white-span">Runtime:</span>{" "}
            {movie?.runtime ? `${movie.runtime} min` : "Data don't exist"}
          </p>

          <p className="text status">
            <span className="white-span">Status:</span>{" "}
            {movie?.status ? movie.status : "Data don't exist"}
          </p>

          <p className="text production">
            <span className="white-span">Production companies:</span>{" "}
            {movie?.production_companies?.length > 0
              ? movie.production_companies.map((pc) => pc.name).join(", ")
              : "Data don't exist"}
          </p>

          {movie?.title && (
            <button
              className={`favorite-btn ${isFavorite ? "added" : ""}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
