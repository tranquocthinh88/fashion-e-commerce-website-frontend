import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { theme } from './theme.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {/* <App /> */}
      <RouterProvider router={router}></RouterProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
