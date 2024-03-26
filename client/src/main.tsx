import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './app-routes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <AppRouter />
      </Auth0ProviderWithNavigate>
   
    </Router>
  </React.StrictMode>,
)
