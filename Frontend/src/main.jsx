import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Settings from './components/Settings.jsx'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function Root() {
  const [authView, setAuthView] = useState('login')
  return (
    <StrictMode>
      <Router>
        <Header />
        <Switch>
          <Route path = "/">
            <App authView={authView} onAuthViewChange={setAuthView} />
          </Route>
          <Route path = "/settings">
            <Settings />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
