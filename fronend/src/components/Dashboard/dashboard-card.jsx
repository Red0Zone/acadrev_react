"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"   


export function DashboardCard({ icon, title, subtitle }) {

  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link to={`/${title.toLowerCase()}`} className="block h-full">
        <div
          className="
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
            bg-white/80 border-gray-200/50 text-gray-800
          "
        >
          {/* Icon container with animation */}
          <div 
            className="
              relative mb-4 p-4 
              border
              rounded-full 
              transition-all duration-300 
              group-hover:scale-110
              flex items-center justify-center
              bg-gray-50 border-gray-200
            "
          >
            <div 
              className="w-10 h-10 flex items-center justify-center"
            >
              {icon}
            </div>
          </div>

          {/* Title with modern typography */}
          <h3 
            className="
              text-base font-semibold mb-1
              text-gray-800
            "
          >
            {title}
          </h3>

          {/* Subtitle with improved styling */}
          <p className="
            text-sm
            text-gray-600
          ">
            {subtitle}
          </p>

          {/* Hover effect overlay */}
          <div 
            className="
              absolute inset-0 rounded-xl
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
               border-black/30 border-2
            "
          />
        </div>
      </Link>
    </motion.div>
  )
} 