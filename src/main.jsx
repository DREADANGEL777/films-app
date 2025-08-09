import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { FavoritesProvider } from "./context/FavoritesContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </HashRouter>
)
