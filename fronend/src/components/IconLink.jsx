"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Helper function to dynamically import images from assets
const imageModules = import.meta.glob("/src/assets/svg/*.svg", { eager: true })

function getImageUrl(imageName) {
  const path = `/src/assets/svg/${imageName}.svg`
  return imageModules[path]?.default || "/path/to/default/image.png"
}

// Define gradient colors for different card types
const gradientColors = {
  university: "from-blue-500 to-cyan-400",
  college: "from-purple-500 to-pink-500",
  settings: "from-amber-500 to-orange-500",
  messages: "from-green-500 to-emerald-500",
  users: "from-violet-500 to-indigo-500",
  reports: "from-rose-500 to-red-500",
  // Default gradient if no match
  default: "from-blue-400 to-purple-500",
}

function IconLink({ url, enName, arName }) {
  const imageUrl = getImageUrl(enName)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Get the appropriate gradient for this card
  const gradientColor = gradientColors[enName.toLowerCase()] || gradientColors.default

  // Check for dark mode and listen for changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }

    // Check initial state
    checkDarkMode()

    // Create observer to watch for class changes on documentElement
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="h-full"
    >
      <a href={url} className="block h-full">
        <div
          className={`
          relative
          rounded-xl 
          overflow-hidden
          h-full
          transition-all duration-300
          ${
            isDarkMode
              ? "bg-gray-800/80 text-white backdrop-blur-sm border border-gray-700/50"
              : "bg-white/90 text-gray-800 backdrop-blur-sm border border-gray-200/50"
          }
          shadow-sm hover:shadow-lg
          p-6
          flex flex-col items-center
          text-center
        `}
        >
          {/* Decorative top gradient */}
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradientColor}`}></div>

          {/* Icon container with animation */}
          <div className="relative mb-4 p-3 rounded-full transition-all duration-300 group-hover:scale-110">
            <div
              className={`
              absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-r ${gradientColor}
            `}
            ></div>

            <img
              src={imageUrl || "/placeholder.svg"}
              alt={enName}
              className={`
                relative z-10
                w-12 h-12
                object-contain 
                transition-all duration-300
                group-hover:scale-110 group-hover:filter-none
                ${isDarkMode ? "filter invert" : ""}
              `}
            />
          </div>

          {/* English name with better typography */}
          <h3
            className={`
            text-base font-medium 
            capitalize
            transition-colors
            mb-1
          `}
          >
            {enName}
          </h3>

          {/* Arabic name with improved styling */}
          <p
            className={`
            text-sm
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}
            transition-colors
          `}
          >
            {arName}
          </p>
        </div>
      </a>
    </motion.div>
  )
}

export default IconLink

