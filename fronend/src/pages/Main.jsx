"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import IconGrid from "../components/IconGrid"
import "./Main.css"

function Main({ onLogout }) {
  // Example user level - In a real app, you might get this from context, auth state, or an API
  const currentUserLevel = 1

  return (
    <div className="main-container">
      <Navbar onLogout={onLogout} />

      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <div className="dashboard-card-container">
              <IconGrid userLevel={currentUserLevel} />
            </div>
          </div>
        </div>
      </main>

      <Footer onLogout={onLogout} buttonText="Switch to Login (Demo)" />
    </div>
  )
}

export default Main

