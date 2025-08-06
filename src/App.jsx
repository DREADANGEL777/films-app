import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import About from "./pages/About"
import MovieDetails from "./pages/MovieDetails"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/about" element={<About />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  )
}
