"use client"
import { motion } from "framer-motion"
import { GraduationCap, Moon, Sun } from "lucide-react"
import "./Header.css"

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header
      className={`header-container ${
        darkMode
          ? "bg-gray-800/80 border-b border-gray-700/50 backdrop-blur-md"
          : "bg-white/80 border-b border-gray-200/50 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          {/* Logo icon */}
          <GraduationCap className={`w-6 h-6 ${darkMode ? "text-primary-400" : "text-primary-600"}`} />

          <h1
            className={`text-xl font-bold bg-gradient-to-r ${
              darkMode ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            AcadRev
          </h1>
        </motion.div>

        {/* Dark Mode Toggle with animation */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-800"
              : "bg-gray-200 hover:bg-gray-300 focus:ring-offset-white"
          }`}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? (
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-5 w-5 text-yellow-300" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-5 w-5 text-gray-700" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </header>
  )
}

export default Header

