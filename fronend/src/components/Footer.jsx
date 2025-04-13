"use client"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import "./Footer.module.css"

function Footer() {
  return (
    <footer className="footer-container max-h-12 flex items-center">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <p className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AcadRev</p>
        </div>

        <p className="text-sm text-medium">
          &copy; {new Date().getFullYear()} AcadRev. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

