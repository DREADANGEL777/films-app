import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./MovieDetails.css"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState("")
  const API_KEY = import.meta.env.VITE_API_KEY

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
  if (!movie) return <div>Loading...</div>

  return (
    <div className="movie-detail">
      <Header />
      <div className="movie-detail-inner">
        <div className="movie-cont-1">
          {movie?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || "No title"}
            />
          ) : (
            <p className="text">Poster: Data don't exist</p>
          )}

          {movie?.title ? (
            <h2 className="movie-title">{movie.title}</h2>
          ) : (
            <p className="text">Title: Data don't exist</p>
          )}
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
        </div>
      </div>
      <Footer />
    </div>
  )
}
