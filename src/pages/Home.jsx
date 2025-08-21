import  { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Home.css"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)
  const [loadedImages, setLoadedImages] = useState({})
  const [lastBackground, setLastBackground] = useState("")

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTopMovies(data.results))
  }, [])

  const preloadImage = (url, movieId) => {
    if (loadedImages[movieId]) return 
    const img = new Image()
    img.src = url
    img.onload = () => setLoadedImages((prev) => ({ ...prev, [movieId]: true }))
  }

  
  useEffect(() => {
    if (topMovies.length > 0) {
      const url = `https://image.tmdb.org/t/p/original${topMovies[0].backdrop_path}`
      preloadImage(url, topMovies[0].id)
    }
  }, [topMovies])

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? 10 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  
  useEffect(() => {
    if (countdown === 9 && topMovies.length > 0) {
      const nextIndex = (index + 1) % topMovies.length
      const nextMovie = topMovies[nextIndex]
      const url = `https://image.tmdb.org/t/p/original${nextMovie.backdrop_path}`
      preloadImage(url, nextMovie.id)
    }
  }, [countdown, index, topMovies])

  
  useEffect(() => {
    if (countdown === 1 && topMovies.length > 0) {
      const nextIndex = (index + 1) % topMovies.length
      const nextMovie = topMovies[nextIndex]

      
      if (loadedImages[nextMovie.id]) {
        setIndex(nextIndex)
        setCountdown(10)
      } else {
       
        const checkLoaded = setInterval(() => {
          if (loadedImages[nextMovie.id]) {
            setIndex(nextIndex)
            setCountdown(10)
            clearInterval(checkLoaded)
          }
        }, 200)
      }
    }
  }, [countdown, index, topMovies, loadedImages])

  const currentMovie = topMovies[index]
  const currentLoaded = currentMovie && loadedImages[currentMovie.id]

  useEffect(() => {
    if (currentMovie && currentLoaded) {
      setLastBackground(`url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`)
    }
  }, [currentMovie, currentLoaded])

  return (
    <div className="home-wrapper">
      <div
        className="background"
        style={{
          backgroundImage: lastBackground,
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
