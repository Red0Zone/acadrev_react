"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Helper function to get border color based on color prop
const getBorderColor = (color) => {
  switch (color) {
    case "blue": return "var(--border-primary)";
    case "purple": return "var(--border-purple)";
    case "amber": return "var(--border-amber)";
    case "green": return "var(--border-green)";
    case "violet": return "var(--border-violet)";
    case "rose": return "var(--border-rose)";
    default: return "var(--border-main)";
  }
}

// Helper function to get icon color based on color prop
const getIconColor = (color) => {
  switch (color) {
    case "blue": return "var(--text-primary)";
    case "purple": return "var(--text-purple)";
    case "amber": return "var(--text-amber)";
    case "green": return "var(--text-green)";
    case "violet": return "var(--text-violet)";
    case "rose": return "var(--text-rose)";
    default: return "var(--text-main)";
  }
}

export function DashboardCard({ icon, title, subtitle, color }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode and listen for changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Check initial state
    checkDarkMode();

    // Create observer to watch for class changes on documentElement
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const borderColor = getBorderColor(color);
  const iconColor = getIconColor(color);
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="h-full"
    >
      <a href={`/${title.toLowerCase()}`} className="block h-full">
        <div
          className={`
            relative
            rounded-xl
            h-full
            transition-all duration-300
            backdrop-blur-sm
            border
            shadow-lg hover:shadow-xl
            p-6
            flex flex-col items-center
            text-center
            group
            ${isDarkMode 
              ? "bg-gray-800/50 border-gray-700/50 text-white" 
              : "bg-white/80 border-gray-200/50 text-gray-800"
            }
          `}
        >
          {/* Icon container with animation */}
          <div 
            className={`
              relative mb-4 p-4 
              border
              rounded-full 
              transition-all duration-300 
              group-hover:scale-110
              flex items-center justify-center
              ${isDarkMode 
                ? "bg-gray-700/50 border-gray-600/50" 
                : "bg-gray-50 border-gray-200"
              }
            `}
          >
            <div 
              className="w-10 h-10 flex items-center justify-center"
            >
              {icon}
            </div>
          </div>

          {/* Title with modern typography */}
          <h3 
            className={`
              text-base font-semibold mb-1
              ${isDarkMode ? "text-white" : "text-gray-800"}
            `}
          >
            {title}
          </h3>

          {/* Subtitle with improved styling */}
          <p className={`
            text-sm
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}
          `}>
            {subtitle}
          </p>

          {/* Hover effect overlay */}
          <div 
            className={`
              absolute inset-0 rounded-xl
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              ${isDarkMode 
                ? "bg-gray-700/20" 
                : "bg-gray-100/50"
              }
            `}
          />
        </div>
      </a>
    </motion.div>
  )
} 