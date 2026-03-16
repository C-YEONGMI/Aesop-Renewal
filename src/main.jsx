import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.scss'
import App from './App.jsx' // Note: This will be updated by bash command later, or I should update it now.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
