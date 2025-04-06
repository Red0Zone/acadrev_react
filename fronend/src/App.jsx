import { useState } from "react";
import Login from "./pages/Login";
import Main from "./pages/Main";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For demo purposes, toggle between login and main page
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <Main />
          {/* Demo button to switch back to login - remove in production */}
          <button
            onClick={handleLoginToggle}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-md shadow-md"
          >
            Switch to Login (Demo)
          </button>
        </>
      ) : (
        <>
          <Login onLogin={handleLoginToggle} />
          {/* Demo button to switch to main page - replace with actual login logic */}
          <button
            onClick={handleLoginToggle}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-md shadow-md"
          >
            Switch to Main (Demo)
          </button>
        </>
      )}
    </div>
  );
}

export default App;
