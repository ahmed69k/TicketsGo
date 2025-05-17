import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/Routes.jsx'
import './index.css'
import { useAuth } from "../src/auth/AuthContext";
import App from "./App.jsx"


createRoot(document.getElementById('root')).render(
  <App/>
)
