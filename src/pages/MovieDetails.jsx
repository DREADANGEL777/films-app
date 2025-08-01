import React from "react"
import { useParams } from "react-router-dom"

export default function MovieDetails() {
  const { id } = useParams()
  return (
    <main style={{ padding: "20px" }}>
      <h2>Movie Details</h2>
      <p>Movie ID: {id}</p>
    </main>
  )
}
