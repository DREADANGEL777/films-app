import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Home.css"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)
  const [loadedImages, setLoadedImages] = useState({})

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

  const preloadImage = (url, movieId) => {
    const img = new Image()
    img.src = url
    img.onload = () => setLoadedImages((prev) => ({ ...prev, [movieId]: true }))
  }

  useEffect(() => {
    if (topMovies.length > 0) {
      topMovies.forEach((movie) => {
        const url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        preloadImage(url, movie.id)
      })
    }
  }, [topMovies])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % topMovies.length
        return next
      })
      setCountdown(10)
    }, 10000)

    return () => clearInterval(interval)
  }, [topMovies])

  const currentMovie = topMovies[index]
  const currentLoaded = currentMovie && loadedImages[currentMovie.id]

  return (
    <div className="home-wrapper">
      <div
        className="background"
        style={{
          backgroundImage: currentLoaded
            ? `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`
            : "none",
        }}
      >
        <Header />

        <div className="container">
          <h1 className="title-box">{currentMovie?.title}</h1>
          <div className="countdown-circle">{countdown}</div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
