import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Provider as ProviderRedux } from 'react-redux';
import { store } from './redux/stores/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProviderRedux  store={store}>
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </CssVarsProvider>
  </ProviderRedux>
)
