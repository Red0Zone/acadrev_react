"use client"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import "./Header.css"

function Header() {
  return (
    <header className="header-container">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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
      </div>
    </header>
  )
}

export default Header

