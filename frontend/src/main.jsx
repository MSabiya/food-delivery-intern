
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {CartProvider} from './context/AppContext.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
<CartProvider>
    <App />
</CartProvider>
</BrowserRouter>
  
)
