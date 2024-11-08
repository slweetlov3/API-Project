import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalStyle from './Globalstyle'
import { GlobalContextProvider } from './context/global'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <GlobalContextProvider>
      <App/>
    </GlobalContextProvider>
  </StrictMode>
)

