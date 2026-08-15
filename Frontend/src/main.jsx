import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UnauthenticatedHeader from './components/UnauthenticatedHeader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnauthenticatedHeader />
    <App />
  </StrictMode>,
)
