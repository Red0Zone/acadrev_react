// src/components/Navbar.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  Landmark,
  BookOpen,
  Users,
  BarChart3,
  University,
  ChevronRight,
  LogOut,
  ChevronLeft
} from "lucide-react"

// Icons used in dashboard/IconGrid
const NAV_ITEMS = [
  { path: "/main", icon: <Home size={20} />, label: "Dashboard" },
  { path: "/university", icon: <University size={20} />, label: "Universities" },
  { path: "/college", icon: <Building2 size={20} />, label: "Colleges" },
  { path: "/departments", icon: <Landmark size={20} />, label: "Departments" },
  { path: "/programs", icon: <BookOpen size={20} />, label: "Programs" },
  { path: "/users", icon: <Users size={20} />, label: "Users" },
  { path: "/reports", icon: <BarChart3 size={20} />, label: "Reports" }
];

// Animation variants remain the same
const sidebarVariants = {
  expanded: { width: "210px" },
  collapsed: { width: "64px" },
};

const textVariants = {
  expanded: { opacity: 1, display: "inline-block" },
  collapsed: { opacity: 0, display: "none" },
};

// More refined text animation variants for logout button
const logoutTextVariants = {
  initial: { 
    opacity: 0, 
    width: 0,
    display: "none" 
  },
  animate: { 
    opacity: 1, 
    width: "auto",
    display: "inline-block",
    transition: { 
      opacity: { delay: 0.2, duration: 0.2 }, 
      width: { delay: 0.2, duration: 0.2 }
    }
  },
  exit: { 
    opacity: 0, 
    width: 0,
    transition: { 
      opacity: { duration: 0.1 }, 
      width: { delay: 0.1, duration: 0.2 }
    },
    transitionEnd: { display: "none" }
  }
};

// Accept isExpanded and toggleSidebar as props
function Navbar({ isExpanded, toggleSidebar, onLogout }) {
  const location = useLocation();

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"} // Use prop
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-screen z-40 bg-white border-r border-gray-200 flex flex-col shadow-md"
    >
      {/* Logo and Toggle Button */}
      <div className={`flex items-center p-4 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
       
        <button
          onClick={toggleSidebar} // Use prop function
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 ml-auto"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"} // Use prop
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />} {/* Use prop */}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center p-2 rounded-md transition-colors duration-150 ease-in-out
                ${isActive
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
              <AnimatePresence>
                {isExpanded && ( // Use prop
                  <motion.span
                    key={`text-${item.path}`}
                    variants={textVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="ml-3 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div className="mt-auto border-t border-gray-200 px-3 py-3">
        <button
          onClick={onLogout}
          className="flex items-center px-3 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <span className="inline-flex justify-center items-center text-red-500">
            <LogOut size={20} />
          </span>
          
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                key="logout-text"
                variants={logoutTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="ml-3 font-medium whitespace-nowrap overflow-hidden"
              >
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}

export default Navbar;
