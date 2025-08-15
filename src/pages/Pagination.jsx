import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Pagination.css"
import placeholderImage from "../assets/placeholder.webp"

const API_KEY = import.meta.env.VITE_API_KEY

const MoviesPagination = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [arrPages, setArrPages] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        )
        const data = await res.json()

        setMovies(data.results || [])

        if (data.total_pages) {
          const total = Math.min(data.total_pages, 500)
          setTotalPages(total)
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  useEffect(() => {
    renderPagination()
  }, [page, totalPages])

  const renderPagination = () => {
    const pages = []
    const groupSize = 3
    const lastGroupStart = Math.max(totalPages - groupSize + 1, 1)
    const currentGroupStart = Math.floor((page - 1) / groupSize) * groupSize + 1
    const currentGroupEnd = Math.min(currentGroupStart + groupSize, totalPages)

    const currentGroupStartMinus =
      currentGroupStart === 1 ? currentGroupStart : currentGroupStart - 1

    for (let i = currentGroupStartMinus; i <= currentGroupEnd; i++) {
      pages.push(`${i}`)
    }

    if (currentGroupEnd < lastGroupStart - 1) {
      pages.push("dots")
      for (let i = lastGroupStart; i <= totalPages; i++) {
        pages.push(`${i}`)
      }
    } else if (currentGroupEnd < totalPages) {
      for (let i = currentGroupEnd + 1; i <= totalPages; i++) {
        pages.push(`${i}`)
      }
    }

    setArrPages(pages)
  }

  const onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="pagination">
      <Header />

      <div className="pagination-inner">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="pagination-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="movie-img"
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
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}

        <div className="pagination-controls">
          <div>
            <button className="pag-btn" onClick={() => onPageChange(1)} disabled={page === 1}>
              START
            </button>
            <button
              className="pag-btn"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              PREV
            </button>
          </div>

          <div className="pag-cont">
            {arrPages.map((item, idx) => {
              if (item === "dots") {
                return (
                  <button key={`dots-${idx}`} className="page-button dots">
                    ...
                  </button>
                )
              }
              const pageNum = Number(item)
              return (
                <button
                  key={item}
                  onClick={() => onPageChange(pageNum)}
                  className={`page-button ${page === pageNum ? "active-page" : ""}`}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <div>
            <button
              className="pag-btn"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              NEXT
            </button>
            <button
              className="pag-btn"
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
            >
              END
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MoviesPagination
