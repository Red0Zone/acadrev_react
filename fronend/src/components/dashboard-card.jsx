"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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

  // Define border color based on card type
  const getBorderColor = () => {
    if (color.includes("blue")) return "border-blue-400";
    if (color.includes("purple")) return "border-purple-400";
    if (color.includes("amber")) return "border-amber-400";
    if (color.includes("green")) return "border-green-400";
    if (color.includes("violet")) return "border-violet-400";
    if (color.includes("rose")) return "border-rose-400";
    return "border-gray-400"; // default
  };

  // Define icon color based on card type
  const getIconColor = () => {
    if (color.includes("blue")) return "text-blue-500";
    if (color.includes("purple")) return "text-purple-500";
    if (color.includes("amber")) return "text-amber-500";
    if (color.includes("green")) return "text-green-500";
    if (color.includes("violet")) return "text-violet-500";
    if (color.includes("rose")) return "text-rose-500";
    return "text-gray-500"; // default
  };

  const borderColor = getBorderColor();
  const iconColor = getIconColor();
  
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
          ${isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' 
            : 'bg-gradient-to-br from-gray-50 to-white text-gray-800'
          } 
          backdrop-blur-sm 
          border-2 ${borderColor} ${isDarkMode ? 'border-opacity-40' : 'border-opacity-60'}
          shadow-md hover:shadow-xl
          p-6
          flex flex-col items-center
          text-center
        `}
        >
          {/* Icon container with animation */}
          <div 
            className={`
              relative mb-4 p-4 
              border-[1px] ${borderColor} ${isDarkMode ? 'border-opacity-40' : 'border-opacity-70'}
              rounded-full 
              transition-all duration-300 
              hover:scale-110
              flex items-center justify-center
              ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'}
            `}
          >
            <div
              className={`
              absolute inset-0 rounded-full opacity-0 hover:opacity-10
              transition-opacity duration-300
              bg-gradient-to-r ${color}
            `}
            ></div>

            <div className={`w-10 h-10 flex items-center justify-center ${iconColor} ${isDarkMode ? 'opacity-90' : 'opacity-100'}`}>
              {icon}
            </div>
          </div>

          {/* English name with better typography */}
          <h3 className={`text-base font-medium mb-1 ${iconColor}`}>
            {title}
          </h3>

          {/* Arabic name with improved styling */}
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        </div>
      </a>
    </motion.div>
  )
} 