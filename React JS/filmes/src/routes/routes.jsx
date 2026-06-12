import {BrowserRouter, Route, Routes} from "react-router-dom"
import CadastroGenero from "../pages/cadastroGenero/CadastroGenero"
import Login from "../pages/login/login"
import CadastroFilme from "../pages/cadastroFilme/CadastroFilme"
import PrivateRoute from "./PrivateRoute"

const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path = "/" element={<Login/>}/>
            <Route path = "/filmes" element={
                <CadastroFilme/>}/>
            <Route 
                path = "/generos" 
                element={
            <PrivateRoute>
             <CadastroGenero/>
            </PrivateRoute>
          }/>

        </Routes>
        
        
        </BrowserRouter>    )
}
export default Rotas