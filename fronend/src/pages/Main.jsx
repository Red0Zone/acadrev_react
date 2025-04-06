"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Main.css";

function Main() {
  // Read initial dark mode preference from localStorage or default to true (dark)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // Save preference
      return newMode;
    });
  };

  useEffect(() => {
    // Apply dark mode class to document element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`main-container ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to AcadRev</h1>

          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Main Dashboard</h2>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              This is the main page of the AcadRev application. You can start
              exploring the features below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {/* Feature Cards */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                      : "bg-gray-50 border-gray-200 hover:bg-white"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">Feature {item}</h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Description for feature {item}. Click to explore more.
                  </p>
                  <button
                    className={`mt-4 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Explore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Main;
