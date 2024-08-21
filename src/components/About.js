import React from 'react'
import './AboutUs.css';

export default function About() {
  return (
    <div className="about-us-container container">
      <h2>About myNotebook</h2>
      <p>
        Welcome to myNotebook! This is your personal digital notebook where you can effortlessly create, manage, and organize your notes. Whether it's for work, study, or personal projects, myNotebook ensures that all your important information is just a click away.
      </p>
      <h3>Features</h3>
      <ul>
        <li>Create, edit, and delete notes with ease.</li>
        <li>Organize your notes by categories.</li>
        <li>Search through your notes quickly.</li>
        <li>Access your notes from any device, anytime.</li>
      </ul>
      <h3>Our Mission</h3>
      <p>
        Our mission is to provide a simple, intuitive, and efficient platform for managing your notes, so you can focus on what really matters. We believe that keeping your thoughts organized shouldn't be a hassle, and that's why we created myNotebook.
      </p>
      <h3>The Team</h3>
      <p>
        myNotebook is developed by a team of passionate developers who are dedicated to creating user-friendly and reliable tools. We're constantly working on new features and improvements to make your experience even better.
      </p>
    </div>
  )
}
