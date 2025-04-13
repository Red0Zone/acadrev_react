"use client"
import { motion } from "framer-motion"
import { Home, BookOpen, Users, Settings, Bell, User, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.module.css"

const navItems = [
  { 
    id: 1, 
    icon: <Home className="w-5 h-5" />, 
    label: "Home", 
    to: "/" 
  },
  { 
    id: 2, 
    icon: <BookOpen className="w-5 h-5" />, 
    label: "Courses", 
    to: "/courses" 
  },
  { 
    id: 3, 
    icon: <Users className="w-5 h-5" />, 
    label: "Students", 
    to: "/students" 
  },
  { 
    id: 4, 
    icon: <Settings className="w-5 h-5" />, 
    label: "Settings", 
    to: "/settings" 
  }
]

function Navbar({ onLogout }) {
  const navigate = useNavigate()

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo Section */}
        <div className="navbar-logo">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AcadRev
              </h1>
            </Link>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.to} className="navbar-link">
                <div className="navbar-link-icon">
                  {item.icon}
                </div>
                <span className="navbar-link-text">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User Section */}
        <div className="navbar-user">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar-notification"
          >
            <Bell className="w-5 h-5" />
            <span className="navbar-notification-badge">3</span>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar-profile"
          >
            <User className="w-5 h-5" />
            <span className="navbar-profile-text">Profile</span>
          </motion.div>

          {onLogout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="navbar-logout"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 