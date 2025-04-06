"use client"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import "./Footer.css"

function Footer({ darkMode, onLogout, buttonText = "Switch to Login (Demo)" }) {
  // For demo toggle button
  const handleToggleClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <footer
      className={`footer-container ${
        darkMode
          ? "bg-gray-800/80 border-t border-gray-700/50 backdrop-blur-md"
          : "bg-white/80 border-t border-gray-200/50 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className={`w-5 h-5 ${darkMode ? "text-primary-400" : "text-primary-600"}`} />
          <p className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>AcadRev</p>
        </div>

        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          &copy; {new Date().getFullYear()} AcadRev. All rights reserved.
        </p>

        <motion.button
          onClick={handleToggleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-sm px-4 py-2 rounded-md ${
            darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors`}
        >
          {buttonText}
        </motion.button>
      </div>
    </footer>
  )
}

export default Footer

