// src/components/Navbar.jsx
"use client";
import React from "react"; // Removed useState import
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  University,
  Building2,
  Landmark,
  BookOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// navItems remains the same
const navItems = [
  { id: 1, icon: <Home size={20} />, label: "Home", to: "/" },
  { id: 2, icon: <University size={20} />, label: "University", to: "/university" },
  { id: 3, icon: <Building2 size={20} />, label: "College", to: "/college" },
  { id: 3, icon: <Landmark size={20} />, label: "Department", to: "/department  " },
  { id: 3, icon: <BookOpen size={20} />, label: "Program", to: "/program" },
  { id: 4, icon: <Bell size={20} />, label: "Notifications", to: "/notifications" },
  { id: 5, icon: <Settings size={20} />, label: "Settings", to: "/settings" },
];

// Animation variants remain the same
const sidebarVariants = {
  expanded: { width: "256px" },
  collapsed: { width: "64px" },
};

const textVariants = {
  expanded: { opacity: 1, display: "inline-block" },
  collapsed: { opacity: 0, display: "none" },
};

// Accept isExpanded and toggleSidebar as props
function Navbar({ isExpanded, toggleSidebar, onLogout, userName, userLevel }) {
  // Removed internal state: const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  // Removed internal toggle function: const toggleSidebar = () => setIsExpanded(!isExpanded);

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
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 ml-auto "
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"} // Use prop
        >
          {isExpanded ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />} {/* Use prop */}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.id}
              to={item.to}
              title={!isExpanded ? item.label : undefined} // Show tooltip when collapsed
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
                    key={`text-${item.id}`}
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

      {/* User Info and Logout */}
      <div className="border-t border-gray-200 p-2 mt-auto">
        <div className={`flex items-center p-2 rounded-md ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
            <User size={18} className="text-indigo-600" />
          </div>
          <AnimatePresence>
            {isExpanded && ( // Use prop
              <motion.div
                key="user-info"
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2, delay: 0.1 }}
                className="ml-3 overflow-hidden"
              >
                <p className="text-sm font-medium text-gray-800 truncate">{userName || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{userLevel || "Level"}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {onLogout && (
             <AnimatePresence>
               {isExpanded && ( // Use prop
                 <motion.button
                   key="logout-button"
                   variants={textVariants}
                   initial="collapsed"
                   animate="expanded"
                   exit="collapsed"
                   transition={{ duration: 0.2, delay: 0.1 }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={onLogout}
                   className="ml-auto p-1 rounded text-gray-500 hover:bg-red-100 hover:text-red-600"
                   title="Logout"
                 >
                   <LogOut size={18} />
                 </motion.button>
               )}
             </AnimatePresence>
          )}
        </div>
         {/* Collapsed Logout Button */}
         {!isExpanded && onLogout && ( // Use prop
            <button
              onClick={onLogout}
              className="w-full mt-1 p-2 rounded text-gray-500 hover:bg-red-100 hover:text-red-600 flex justify-center"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
      </div>
    </motion.aside>
  );
}

export default Navbar;
