// src/App.jsx
import "./App.css";
import Login from './pages/Login';
import MainPage from './pages/Main';
import PageNotFound from './pages/PageNotFound';
import ManageUniPage from "./pages/University";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Header from "./components/Header"; // <-- Import Header
import Footer from "./components/Footer"; // <-- Import Footer
import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import SettingsPage from "./pages/Settings";
import UsersPage from "./pages/Users";
import College from "./pages/college";
import { useState } from "react";

// Layout can remain simple, just rendering the matched route
function Layout() {
  return <Outlet />;
}

function ProtectedRoute() {
  const { isLoggedIn, isLoading, user, logout } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Define heights for calculations (assuming h-16 for header)
  const headerHeight = "4rem"; // h-16
  const sidebarExpandedWidth = "256px"; // w-64
  const sidebarCollapsedWidth = "0px"; // w-16

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  console.log(`isLoggedIn in ProtectedRoute: ${isLoggedIn}`);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    // Main container for the protected layout
    <div className="flex flex-col min-h-screen">
      {/* Render Header at the top */}
      <Header userName={user?.name} userLevel={user?.level} onLogout={logout} />

      {/* Container for sidebar and main content (takes remaining height) */}
      <div className="flex flex-1 overflow-hidden"> {/* Use flex-1 to grow */}
        {/* Pass state and toggle function down to Navbar */}
        {/* Navbar needs adjusted height and top position */}
        <Navbar
          isExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
          onLogout={() => logout()}
          userName={user?.name}
          userLevel={user?.level}
        />

        {/* Main content area */}
        <main
          className="flex-grow overflow-y-auto bg-gray-50" // Add overflow-y-auto here
          style={{
            paddingLeft: isSidebarExpanded ? sidebarExpandedWidth : sidebarCollapsedWidth,
            // No padding-top needed here as Header is outside this flex container
            transition: 'padding-left 0.3s ease-in-out', // Added transition directly
          }}
        >
          {/* Inner padding for content */}
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Render Footer at the bottom */}
       <Footer />  {/* Uncomment if you have a Footer component */}
    </div>
  );
}

// App component remains the same
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { index: true, element: <MainPage /> },
            { path: 'main', element: <MainPage /> },
            { path: 'users', element: <UsersPage /> },
            { path: 'university', element: <ManageUniPage /> },
            { path: 'settings', element: <SettingsPage /> },
            { path: 'college', element: <College /> },
            // { path: 'notifications', element: <NotificationsPage /> },
          ],
        },
        { path: 'login', element: <Login /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
