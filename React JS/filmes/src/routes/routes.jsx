import {BrowserRouter, Route, Routes} from "react-router-dom"
import CadastroFilme from "../pages/CadastroFilme/CadastroFilme"
import CadastroGenero from "../pages/cadastroGenero/CadastroGenero"
import Login from "../pages/login/login"

const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path = "/" element={<Login/>}/>
            <Route path = "/filmes" element={<CadastroFilme/>}/>
            <Route path = "/generos" element={<CadastroGenero/>}/>
        </Routes>
        
        
        </BrowserRouter>    )
}
export default Rotas