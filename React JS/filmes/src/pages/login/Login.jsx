import "./Login.css"
import Botao from "../../components/botao/Botao"
import Logo from "../../assets/img/logo.svg"
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {



    const { usuario, setUsuario } = useContext(UsuarioContext);


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();



    const login = async () => {

        if (email.trim().length == 0 || senha.trim().length == 0) {
            Alerta({

                title: "Login",
                text: "Preencher todos os campos",
                icon: "warning",
                confirmButtonText: "OK",
            })
            return false;

        }

        const dadosLogin = {
            email: email,
            senha: senha,
        }

        try {
            const retornoAPI = await api.post("/login", dadosLogin)

            console.log(retornoAPI.data)
            console.log("Retorno da API")



            const token = retornoAPI.data.token
            const usuarioDecoded = jwtDecode(token)
            console.log(usuarioDecoded)

            setUsuario(usuarioDecoded)
            localStorage.setItem("usuario", JSON.stringify(usuarioDecoded))

            setEmail("")
            setSenha("")
            navigate("/generos")


        } catch (error) {
            Alerta({

                title: "Login",
                text: "Preencher todos os campos",
                icon: "warning",
                confirmButtonText: "OK",
            })
        }

        setUsuario(email);

        localStorage.setItem("usuario", JSON.stringify(email));

        setEmail("");
        navigate("")
    }
    const verificaLogin = () => {
        const logado = JSON.stringify(localStorage.getItem("usuario"))
        if (logado !== undefined || logado !== null) {
            setUsuario(usuario)
            navigate("/generos")
        }
    }

    useEffect(() => {
        verificaLogin()


    }, [])
    return (
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <img src={Logo} alt="Logo do Filmoteca" />
                <form action="" className="form_login">
                    <h1>Login</h1>
                    <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        <div className="campo_input">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value);
                                }} />
                        </div>
                    </div>
                    <Botao nomeDoBotao="Entrar"
                        cancelarEdicao={login}
                        btnEditar={true}

                        onClick={() => {
                            login();
                        }}
                    />
                </form>
            </section>
        </main>
    )
}

export default Login