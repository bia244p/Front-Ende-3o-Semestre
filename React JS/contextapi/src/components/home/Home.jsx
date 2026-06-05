import { useContext } from "react";
import UsuarioContext from "../context/UsuarioContext";

const Home = () => {
    const { usuario} = useContext(UsuarioContext)

  return (
    <>
    <h2>Pagina Home</h2>
    <p>Usuario: {usuario}</p>
    </>
  )
}

export default Home;