import React from "react";
import "./Footer.css";

function Footer({ darkMode }) {
  return (
    <footer
      className={`footer-container ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm font-medium mb-2 md:mb-0">AcadRev</p>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          &copy; {new Date().getFullYear()} AcadRev. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
