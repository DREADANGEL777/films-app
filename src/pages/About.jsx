import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./About.css"

export default function About() {
  return (
    <div className="about">
      <Header />
      <div className="about__inner">
        <h1 className="about__title">
          <span className="white">FILM APP</span> – Discover, Search, and Enjoy Movies Anytime
        </h1>
        <h3 className="about__subtitle">
          <span className="white">Your ultimate movie companion</span> – explore top picks, trending
          titles, and <br />
          hidden gems, all in one sleek and easy-to-use platform.
        </h3>
        <ul className="about__list">
          <li className="about__item">
            <span className="white">Smart Search Bar</span> – Quickly find movies by title using the
            intuitive search box.
          </li>
          <li className="about__item">
            <span className="white">Clean Navigation</span> – Simple menu with easy access to Home,
            Movies, and About.
          </li>
          <li className="about__item">
            <span className="white">Featured Movie Banner</span> – Eye-catching full-width image
            spotlighting the latest hit, like Bride Hard.
          </li>
          <li className="about__item">
            <span className="white">Interactive UI</span> – Engaging design with numbered slides for
            quick browsing.
          </li>
          <li className="about__item">
            <span className="white">Stylish Visuals</span> – Modern, immersive background images
            create a cinematic experience.
          </li>
          <li className="about__item">
            <span className="white">Always Up-to-Date</span> – © 2025 FILM APP – ensuring fresh
            content and a current library.
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
