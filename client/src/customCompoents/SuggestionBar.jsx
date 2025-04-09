import { useState } from 'react'
import './suggestionBar.css'

function Header({ onToggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggleSidebar(newState)
  }

  return (
    <header className="header">
      <div className="header__branding">
        <h1>My Company</h1>
        <p>Feedback Board</p>
      </div>
      <div className="header__actions">
        <button className="add-feedback-btn">+ Add Feedback</button>
        <button className="menu-btn" onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}

export default Header
