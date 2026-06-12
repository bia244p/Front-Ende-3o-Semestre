import { useEffect, useState } from "react"
import { UsuarioContext } from "./UsuarioContext"

const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    // const [listaUsuarios, setUsuario] = useState([])

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuario")) || ""
        setUsuario(usuarioLogado)
    }, [])

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider