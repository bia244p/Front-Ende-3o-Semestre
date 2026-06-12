import "./CadastroFilme.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Cadastro from "../../components/cadastro/Cadastro"
import { Alerta } from "../../components/alerta/Alerta"
import { useState, useEffect } from 'react';
import api from "../../services/Services"
import Lista from "../../components/lista/Lista"

const CadastroFilme = () => {
    // states e variáveis
    const [valor, setValor] = useState("")
    const [editar, setEditar] = useState(false)
    const [idFilme, setIdFilme] = useState(0);
    const [idGenero, setIdGenero] = useState(0);
    const [listaFilmes, setListaFilmes] = useState([])
    const [listaGeneros, setlistaGeneros] = useState([])
    const [imagem, setImagem] = useState("") 
    // Get Gêneros
    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero")
            setlistaGeneros(retornoAPI.data)
        } catch (error) {
            Alerta({
                title: 'Cadastro de Filmes',
                text: 'Problemas ao carregar os dados da API',
                icon: 'error',
                confirmButtonText: ':('
            })
            console.log(error)
        }
    }

    // Get Filmes
    const getFilmes = async () => {
        try {
            const retornoAPI = await api.get("/Filme")
            setListaFilmes(retornoAPI.data)
        } catch (error) {
            Alerta({
                title: 'Cadastro de Filmes',
                text: 'Problemas ao carregar os dados da API',
                icon: 'error',
                confirmButtonText: ':('
            })
            console.log(error)
        }
    }

    // Cadastrar Filme
    const cadastrarFilme = async (e) => {
        e.preventDefault()

        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Preencheu tudo mesmo?",
                icon: "error",
                confirmButtonText: ":/"
            })
            return false
        }

        const formData = new FormData();
        formData.append('Titulo', valor);
        formData.append('idGenero', idGenero);
        
        // CORRIGIDO: Agora envia a imagem no cadastro também!
        if (imagem) {
            formData.append('Imagem', imagem);
        }

        try {
            const retornoAPI = await api.post("/Filme", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            Alerta({
                title: 'Cadastro de Filme',
                text: `${valor} Cadastrado com sucesso!!`,
                icon: 'success',
                confirmButtonText: 'Top!'
            })

            getFilmes()
            limparFormulario()
        } catch (error) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Erro ao cadastrar na API",
                icon: "warning",
                confirmButtonText: ':|'
            });
            console.log(error)
        }
    }

    // Preparar Edição
    const preEditar = (item) => {
        setEditar(true)
        setValor(item.titulo)
        setImagem(item.imagem || item.Imagem)
        setIdFilme(item.idFilme)
        setIdGenero(item.idGenero)
    }

    const editarFilme = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("Titulo", valor)
        formData.append("IdGenero", idGenero)

        if (imagem) {
            formData.append("Imagem", imagem)
        }

        try {
            await api.put(`/Filme/${idFilme}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            Alerta({
                title: "Edição",
                text: "Filme editado com sucesso!",
                icon: "success",
                confirmButtonText: "Continuar"
            })

            getFilmes()
            limparFormulario()

        } catch (e) {
            console.log(e)

            Alerta({
                title: "Erro",
                text: "Erro ao editar filme",
                icon: "error",
                confirmButtonText: "Continuar"
            })
        }
    }

    // Excluir Filme
    const excluirFilme = async (item) => {
        const result = await Alerta({
            title: "Cadastro de Filmes",
            text: `Você quer apagar o filme ${item.nome || item.titulo}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Apagar",
            cancelButtonText: "Cancelar",
        })

        if (!result.isConfirmed) {
            return false
        }

        try {
            const retornoAPI = await api.delete(`/Filme/${item.idFilme}`)
            if (retornoAPI.status === 200 || retornoAPI.status === 204) {
                Alerta({
                    title: "Excluir Filme",
                    text: `Excluído com sucesso!!`,
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                getFilmes()
            } else {
                alert("Problemas ao apagar o filme :(")
            }
        } catch (error) {
            Alerta({
                title: "Excluir Filme",
                text: "Problemas ao excluir, tente novamente",
                icon: "error",
                confirmButtonText: ':('
            });
            console.log(error)
        }
    }

    // Limpar Formulário
    const limparFormulario = () => {
        setValor("")
        setImagem("")
        setEditar(false)
        setIdFilme(0)
        setIdGenero("")
    }

    // Ciclo de vida
    useEffect(() => {
        getGeneros();
        getFilmes();
    }, [])

    return (
        <>
            <Header />

            <main>
                <Cadastro
                    tituloCadastro="Cadastrar um filme"
                    placeholder="filme"
                    funcCadastro={editar ? editarFilme : cadastrarFilme}
                    valor={valor}
                    setValor={setValor}
                    btnEditar={editar}
                    cancelarEdicao={limparFormulario}
                    listaGeneros={listaGeneros}
                    setIdGenero={setIdGenero}
                    idGenero={idGenero}
                    setImagem={setImagem}
                    imagem={imagem}
                />

                <Lista
                    tituloLista="Lista de Filmes"
                    lista={listaFilmes}
                    tipoLista="filme"
                    funcExcluir={excluirFilme}
                    funcEditar={preEditar}
                    listaGeneros={listaGeneros}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroFilme