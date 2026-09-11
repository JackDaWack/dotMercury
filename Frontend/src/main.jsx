import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'

function Root() {
  const [authView, setAuthView] = useState('login')

  return (
    <StrictMode>
      <Header />
      <App authView={authView} onAuthViewChange={setAuthView}/>
      <Footer />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
