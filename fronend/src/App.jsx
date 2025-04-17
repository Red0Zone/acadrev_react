import "./App.css";
import Login from './pages/Login';
import MainPage from './pages/Main';
import PageNotFound from './pages/PageNotFound';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function ProtectedRoute() {
  const { isLoggedIn , isLoading ,user , logout} = useAuth();
  console.log(`isLoggedIn in ProtectedRoute: ${isLoggedIn}`);

  if(isLoading){
    return null;
  }

  if (!isLoggedIn) {
     return <Navigate to="/login" replace />;
  }


 
  
  return(
  <>
    <Navbar onLogout={() => logout()} userName={user.name} userLevel={user.level}/> 
    <Outlet />
  </>);  
}

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