import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/Routes.jsx'
import './index.css'
import { AuthProvider, useAuth } from "../src/auth/AuthContext";
import App from "./App.jsx"
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </BrowserRouter>
  
)
