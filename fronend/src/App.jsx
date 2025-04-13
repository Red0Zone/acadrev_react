import { useState } from "react";
import "./App.css";
import Login from './pages/Login'
import MainPage from './pages/Main'
import PageNotFound from './pages/PageNotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
])

function App() {
 

  return (
  <>
    <Header/>
   <RouterProvider router={router}/>
   <Footer/>
  </>
  );
}

export default App;
