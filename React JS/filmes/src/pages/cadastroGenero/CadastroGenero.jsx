import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/Cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";
import api from "../../Services/services"
import Swal from "sweetalert2";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroGenero = () => {
  const [valor, setValor] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    getGenero();
  }, []);

  const getGenero = async () => {
    try {
      const retornoAPI = await api.get("/Genero");
      setListaGeneros(retornoAPI.data);
    } catch (error) {
      console.log(error);
      Alerta({
        title: "Erro!",
        text: "Problemas ao carregar os dados da API!",
        icon: "error",
      });
    }
  };

  const cadastrarGenero = async (e) => {
    e.preventDefault();

    if (valor.trim().length == 0) {
      Alerta({
        title: "Atenção!",
        text: "Por favor, preencha o nome do gênero!",
        icon: "warning",
      });
      return false;
    }

    const objCadastro = {
      nome: valor,
    };

    try {
      const retornoAPI = await api.post("/Genero", objCadastro);

      Alerta({
        title: "Sucesso!",
        text: "Gênero cadastrado com sucesso!",
        icon: "success",
      });

      limparFormulario();
      getGenero();
    } catch (error) {
      console.log(error);
      Alerta({
        title: "Erro!",
        text: "Erro ao cadastrar o gênero. Tente novamente!",
        icon: "error",
      });
    }
  };

  const limparFormulario = () => {
    setValor("");
    setEditar(false);
    setId(0);
  };

  const excluirGenero = async (item) => {
    try {
      const retornoAPI = await api.delete(`/Genero/${item.idGenero}`);
      if (retornoAPI.status == 200 || retornoAPI.status == 204) {
        Alerta({
          title: "Sucesso!",
          text: "Gênero excluído com sucesso!",
          icon: "success",
        });
        getGenero();
      } else {
        Alerta({
          title: "Erro!",
          text: "Problemas ao excluir o gênero. Tente novamente!",
          icon: "error",
        });
      }
    } catch (error) {
      Alerta({
        title: "Erro",
        text: "Existe um Filme cadastrado com esse Genero ",
        icon: "error",
      });
    }
  };

  const PreEditar = (item) => {
    console.log(item);
    
    setValor(item.nome);
    setEditar(true);
    setId(item.idGenero);
  };

  const editarGenero = async (e) => {
    e.preventDefault();

    if (valor.trim().length == 0) {
      Alerta({
        title: "Atenção!",
        text: "Por favor, preencha o nome do gênero!",
        icon: "warning",
      });
      return false;
    }

    console.log("ID:", id);

    const objEditar = {
      idGenero: id,
      nome: valor
    };

    console.log(objEditar);

    try {
      const retornoAPI = await api.put(`/Genero/${id}`, objEditar);

      Alerta({
        title: "Sucesso!",
        text: "Gênero atualizado com sucesso!",
        icon: "success",
      });

      limparFormulario();
      getGenero();
    } catch (error) {
      console.log(error.response?.data);
      Alerta({
        title: "Erro!",
        text: "Erro ao atualizar o gênero. Tente novamente!",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <Cadastro
          // Troca o título visualmente de forma dinâmica quando estiver editando
          tituloCadastro="Cadastro de Gênero"
          visibilidade="none"
          placeholder="gênero"
          funcCadastro={editar ? editarGenero : cadastrarGenero}
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
          funcEditar={PreEditar}
        />
      </main>
      <Footer />
    </>
  );
};
export default CadastroGenero;
