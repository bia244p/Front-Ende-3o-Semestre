import { useState, UseState } from "react"
import  UsuarioContext  from "./UsuarioContext"

const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState("Bia")
      //  const [usuario, setUsuario] = useState([])


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