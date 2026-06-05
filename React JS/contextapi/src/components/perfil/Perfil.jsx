import { useContext, useState } from "react";
import UsuarioContext from "../context/UsuarioContext";

const Perfil = () => {
    const { usuario, setUsuario } = useContext(UsuarioContext);
    const [novoUsuario, setNovoUsuario] = useState("");
    return (

        <>
            <h2>Pagina de perfil do usuario</h2>
            <span>Usuario: {usuario}</span>
            <p>
                <input 
                type="text" 
                placeholder="Novo Usuario"
                onChange={(e) => {
                    setNovoUsuario
                    (e.target.value)
                }}
                />
                <button onClick={
                    () => {
                        setUsuario(novoUsuario)
                    }
                }>Alterar Usuario</button>
            </p>
        </>
    )
}

export default Perfil;