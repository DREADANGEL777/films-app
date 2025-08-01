import React, { useState } from "react"
import "./SearchBar.css"
import MovieCard from "./MovieCard"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19d8eb16e213b200c85a81e1c09fdabc&query=${encodeURIComponent(
          query
        )}`
      )
      const data = await res.json()
      setResults(data.results)
      setShowResults(true)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className="search-bar">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {showResults && results.length > 0 && (
        <div className="search-result">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
