import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UsuarioProvider from './components/context/UsuarioProvider.jsx'
import ProdutoProvider from './components/context/ProdutoProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProdutoProvider>
      <App />
    </ProdutoProvider>
  </StrictMode>,
)
