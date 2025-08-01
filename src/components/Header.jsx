import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"
import SearchBar from "./SearchBar"

export default function Header() {
  return (
    <header className="header">
      <div className="header-content" style={{ position: "relative" }}>
        <div className="logo">FILM APP</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/about">About</Link>
        </nav>
        <SearchBar />
      </div>
    </header>
  )
}
