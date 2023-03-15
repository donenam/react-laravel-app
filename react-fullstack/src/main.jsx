import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import router from './router'
import {ContextProvider} from './contexts/ContextProvider'

 
//strict mode makes use effect to run twice on dev mode, but once on prod
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
