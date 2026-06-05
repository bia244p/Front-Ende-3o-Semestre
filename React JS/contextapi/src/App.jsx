import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import MyPage from './components/mypage/MyPage'
import Perfil from './components/perfil/Perfil'
import Header from './components/header/Header'
import CadastroProduto from './components/cadastroproduto/CadastroProduto'
import ListarProduto from './components/listarProduto/ListarProduto'

function App() {

  return (
    <>
    <CadastroProduto />
    <ListarProduto />
      {/* <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
