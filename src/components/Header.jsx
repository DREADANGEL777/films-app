import { NavLink } from "react-router-dom"

import "./Header.css"
import SearchBar from "./SearchBar"

export default function Header() {
  return (
    <header className="header">
      <div className="header-content" style={{ position: "relative" }}>
        <div className="logo">FILM APP</div>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            Favorites
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/pagination" className={({ isActive }) => (isActive ? "active" : "")}>
            Pagination
          </NavLink>
        </nav>
        <SearchBar />
      </div>
    </header>
  )
}
