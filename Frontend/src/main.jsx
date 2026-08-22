import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import UnauthenticatedHeader from './components/UnauthenticatedHeader.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnauthenticatedHeader />
    <App />
    <Footer />
  </StrictMode>,
)
