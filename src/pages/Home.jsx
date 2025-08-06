import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Home.css"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? 10 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTopMovies(data.results))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % topMovies.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [topMovies])

  const currentMovie = topMovies[index]

  const isFavorite = currentMovie && favorites.some((m) => m.id === currentMovie.id)

  const toggleFavorite = () => {
    if (!currentMovie) return

    let updatedFavorites
    if (isFavorite) {
      updatedFavorites = favorites.filter((m) => m.id !== currentMovie.id)
    } else {
      updatedFavorites = [...favorites, currentMovie]
    }

    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  return (
    <div className="home-wrapper">
      <div
        className="background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
        }}
      >
        <Header />

        <h1 className="title-box">{currentMovie?.title}</h1>

        <div className="home-controls">
          <div className="countdown-circle">{countdown}</div>
          <button className={`favorite-btn ${isFavorite ? "added" : ""}`} onClick={toggleFavorite}>
            {isFavorite ? "Added" : "Add to Favorites"}
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}
