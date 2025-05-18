import { useState, StrictMode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAuth, AuthProvider } from './auth/AuthContext'
import AppRoutes from "./routes/Routes.jsx"
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

      <StrictMode>
        <ToastContainer/>
        <Navbar/>
      <AppRoutes />
      <Footer/>
    </StrictMode>

    
  )
}

export default App
