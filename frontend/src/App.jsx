import { useState, StrictMode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAuth, AuthProvider } from './auth/AuthContext'
import AppRoutes from "./routes/Routes.jsx"
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (

      <StrictMode>
        <Navbar/>
      <AppRoutes />
      <Footer/>
    </StrictMode>

    
  )
}

export default App
