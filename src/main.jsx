import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { supabase } from './lib/supabaseClient.js'
import { SupabaseContext } from './SupabaseContext.js'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <SupabaseContext.Provider value={supabase}>
        <App />
      </SupabaseContext.Provider>
    </StrictMode>
  </BrowserRouter>,
)
