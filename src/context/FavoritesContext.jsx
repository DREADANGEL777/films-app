import { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === movie.id)) return prev
      const updated = [...prev, movie]
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const removeFromFavorites = (id) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      let updated
      if (prev.some((f) => f.id === movie.id)) {
        updated = prev.filter((f) => f.id !== movie.id)
      } else {
        updated = [...prev, movie]
      }
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
