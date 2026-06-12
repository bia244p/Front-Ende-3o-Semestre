import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";
import api from "../../services/Services";
import Swal from "sweetalert2";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroGenero = () => {
    const [valor, setValor] = useState("");
    const [listaGeneros, setListaGeneros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idGenero, setIdGenero] = useState("");

    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/genero");


            setListaGeneros(retornoAPI.data);
        } catch (error) {
            Alerta({
                title: "Cadastro Gênero",
                text: "Problemas ao carregar os dados da API",
                icon: "error",
                confirmButtonText: ":("
            });

            console.log(error);
        }
    };

    useEffect(() => {
        getGeneros();
    }, []);

    const limparFormulario = () => {
        setValor("");
        setEditar(false);
        setIdGenero("");
    }

    const cadastrarGenero = async (e) => {
        e.preventDefault();

        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Gênero",
                text: "Preencher o gênero!",
                icon: "error",
                confirmButtonText: "OK"
            });

            return;
        }

        const objCadastro = {
            Nome: valor
        }

        try {
            await api.post("/Genero", objCadastro);

            Alerta({
                title: "Cadastro de Gênero",
                text: `${valor} cadastrado com sucesso!`,
                icon: "success",
                confirmButtonText: "Top!"
            });

            getGeneros();
            limparFormulario();
        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
                text: "Erro ao cadastrar na API",
                icon: "error",
                confirmButtonText: "OK"
            });

            console.log(error.response?.data);
        }
    };

    const excluirGenero = async (item) => {
        const result = await Alerta({
            title: "Cadastro de Generos",
            text: `Você quer apagar o Genero ${item.nome}?`,
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
            const retornoAPI = await api.delete(`/Genero/${item.idGenero}`)
            if (retornoAPI.status === 200 || retornoAPI.status === 204) {
                Alerta({
                    title: "Excluir Genero",
                    text: `Excluído com sucesso!!`,
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                getGeneros()
            } else {
                alert("Problemas ao apagar o genero :(")
            }
        } catch (error) {
            Alerta({
                title: "Excluir Genero",
                text: "Problemas ao excluir, tente novamente",
                icon: "error",
                confirmButtonText: ':('
            });
            console.log(error)
        }
    }

    const preEditar = (item) => {
        setEditar(true);
        setValor(item.nome);
        setIdGenero(item.idGenero);
    }

    const editarGenero = async (e) => {
        e.preventDefault();

        if (valor.trim().length === 0) {
            Swal.fire({
                title: "Editar Gênero",
                text: "Preencher o gênero",
                icon: "warning",
                confirmButtonText: "OK"
            });

            return;
        }

        const objEditar = {
            IdGenero: idGenero,
            Nome: valor
        }

        try {
            await api.put(`/Genero/${idGenero}`, objEditar);

            Alerta({
                title: "Editar Gênero",
                text: "Atualizado com sucesso!",
                icon: "success",
                confirmButtonText: "OK"
            });

            limparFormulario();
            getGeneros();
        } catch (error) {
            Alerta({
                title: "Editar Gênero",
                text: "Erro ao atualizar os dados",
                icon: "error",
                confirmButtonText: "OK"
            });

            console.log(error.response?.data);
        }
    };

    return (
        <>
            <Header />

            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"
                    funcCadastro={
                        editar
                            ? editarGenero
                            : cadastrarGenero
                    }
                    valor={valor}
                    setValor={setValor}
                    btnEditar={editar}
                    cancelarEdicao={limparFormulario}
                />

                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"
                    lista={listaGeneros}
                    tipoLista="genero"
                    funcExcluir={excluirGenero}
                    funcEditar={preEditar}
                />
            </main>

            <Footer />
        </>
    );
};

export default CadastroGenero;