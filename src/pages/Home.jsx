import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Home.css"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)

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

  return (
    <div className="home-wrapper">
      <div
        className="background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
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
