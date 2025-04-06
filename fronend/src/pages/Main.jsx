"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import IconGrid from "../components/IconGrid"
import "./Main.css"

function Main({ onLogout }) {
  // Read initial dark mode preference from localStorage or default to true (dark)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode ? JSON.parse(savedMode) : true
  })

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem("darkMode", JSON.stringify(newMode)) // Save preference
      return newMode
    })
  }

  useEffect(() => {
    // Apply dark mode class to document element
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Example user level - In a real app, you might get this from context, auth state, or an API
  const currentUserLevel = 1

  return (
    <div
      className={`main-container ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard</h2>
            <div className="p-6 rounded-xl backdrop-blur-sm bg-opacity-50">
              {/* Render the IconGrid component */}
              <IconGrid userLevel={currentUserLevel} />
            </div>
          </div>
        </div>
      </main>

      <Footer 
        darkMode={darkMode} 
        onLogout={onLogout} 
        buttonText="Switch to Login (Demo)" 
      />
    </div>
  )
}

export default Main

