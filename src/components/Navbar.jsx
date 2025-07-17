import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
      <nav>
        <div className="logo">
            TaskBook
        </div>

        <ul>
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
      </nav>
  )
}

export default Navbar
