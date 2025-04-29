"use client"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import "./Header.module.css"

function Header() {
  const { isLoggedIn, user } = useAuth() // Added logout function

  return (
    <header className="header-container h-16 flex items-center ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <GraduationCap className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AcadRev
          </h1>
        </motion.div>

        {/* Welcome message and Logout Button */}
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <>
              <span className="text-gray-700">
                {user.name || "User"}, {user.level}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
