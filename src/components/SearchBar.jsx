import React, { useState, useRef, useEffect } from "react"
import "./SearchBar.css"
import MovieCard from "./MovieCard"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState("")

  const searchRef = useRef(null)
  const API_KEY = import.meta.env.VITE_API_KEY

  const handleSearch = async () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      setShowResults(true)
      setResults([])
      setError("You must write something")
      return
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          trimmedQuery
        )}`
      )
      const data = await res.json()

      if (data.results.length === 0) {
        setError("Data don't exist")
        setResults([])
      } else {
        setResults(data.results)
        setError("")
      }
      setShowResults(true)
    } catch (error) {
      console.error("Search error:", error)
      setError("Something went wrong. Try again later.")
      setShowResults(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-bar-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showResults && (
        <div className="search-result">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      )}
    </div>
  )
}
