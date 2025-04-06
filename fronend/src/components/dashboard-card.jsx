"use client"

import { motion } from "framer-motion"

export function DashboardCard({ icon, title, subtitle, color }) {
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
          overflow-hidden
          h-full
          transition-all duration-300
          bg-background/90 backdrop-blur-sm border border-border/50
          shadow-sm hover:shadow-lg
          p-6
          flex flex-col items-center
          text-center
        `}
        >
          {/* Decorative top gradient */}
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${color}`}></div>

          {/* Icon container with animation */}
          <div className="relative mb-4 p-3 rounded-full transition-all duration-300 group-hover:scale-110">
            <div
              className={`
              absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-r ${color}
            `}
            ></div>

            <div className="w-12 h-12 flex items-center justify-center text-foreground/80">
              {icon}
            </div>
          </div>

          {/* English name with better typography */}
          <h3 className="text-base font-medium mb-1">
            {title}
          </h3>

          {/* Arabic name with improved styling */}
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </a>
    </motion.div>
  )
} 