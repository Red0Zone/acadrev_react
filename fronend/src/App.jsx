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
        <Main onLogout={handleLoginToggle} />
      ) : (
        <Login onLogin={handleLoginToggle} />
      )}
    </div>
  );
}

export default App;
