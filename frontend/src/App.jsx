import { useState, StrictMode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth, AuthProvider } from './auth/AuthContext'
import AppRoutes from "./routes/Routes.jsx"

function App() {
  return (
      <StrictMode>
      <AppRoutes />
    </StrictMode>

    
  )
}

export default App
