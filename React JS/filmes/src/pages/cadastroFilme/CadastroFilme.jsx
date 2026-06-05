import Header from "../../components/header/Header"
import "./Cadastrofilme.css"
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { Alerta } from "../../components/alerta/alerta";
import { useState } from "react";
import Lista from "../../components/lista/Lista";

const CadastroFilmes = () => {
 
    //States e Variaveis
  const [valor, setValor] = useState("")
  const [editar, setEditar] = useState(false)
   const[listaFilmes, setListaFilmes] = useState([
    {
        idGenero: 1,
        titulo: "As Branquelas",
        genero: {idGenero: 2, nome: "Comedia"}
    },
    {
        idGenero: 2,
        titulo: "Invocação do Mal",
        genero: {idGenero: 2, nome: "Terror"}
    },
    {
        idGenero: 2,
        titulo: "Velozes e Furioso",
        genero: {idGenero: 2, nome: "Ação"}
    },

   ])
  const [listaGeneros, setListaGeneros] = useState([
    {idGenero: 1, nome: "Ação"},
    {idGenero: 2, nome: "Romance"},
    {idGenero: 3, nome: "Terror"},
    {idGenero: 4, nome: "Suspense"},
  ])
 
  

 
//Get
//Busca os generos para colocar nno select do formulario

const getGeneros = async() => {
    try {
       const retornoAPI =await getFilmes.api("/Generos")
       setListaGenero(retornoAPI.data)
        
    } catch (error) {
       Alerta({
          title: "Editado com sucesso",
          text: "Editar",
          icon: 'success',
          confirmButtonText: 'Editado'
      
          
       })
        alert("Erro ao cadastra na api.")
         










        
       
        
    }
}
  const getFilmes = () => {
    Alerta({
        title: "Cadastro de Filme",
        text: "Listagem de filmes em desenvolvimento",
        icon: "sucess",
        confirmButtonText: "Ok"
    })
  }

//Post
   const cadastrarFilme = (e) => {
     e.preventDefault()
    Alerta({
        title: "Cadastro de Filme",
        text: "Cadastrar filme em desenvolvimento",
        icon: "success",
        confirmButtonText: "Ok"
    })
  }
  //Put
    const preEditar = (e) => {
     e.preventDefault()
    Alerta({
        title: "Cadastro de Filme",
        text: " Pre Editar filme em desenvolvimento",
        icon: "sucess",
        confirmButtonText: "Ok"
    })
  }

   const editarFilme = (e) => {
     e.preventDefault()
    Alerta({
        title: "Cadastro de Filme",
        text: "Editar filme em desenvolvimento",
        icon: "sucess",
        confirmButtonText: "Ok"
    })
  }
 //Delete
   const excluirFilme = () => {
    Alerta({
        title: "Cadastro de Filme",
        text: "Excluir Formulario em desenvolvimento",
        icon: "sucess",
        confirmButtonText: "Ok"
    })
  }

   const limparFormulario = () => {
    Alerta({
        title: "Cadastro de Filme",
        text: "Limpar Formulario em desenvolvimento",
        icon: "sucess",
        confirmButtonText: "Ok"
    })
  }

  
    //Funcoes

    //Ciclo de vida
    return (
        <>
        <Header />
       <main>

         <Cadastro
          //Define o título que será exibido no formulário
          tituloCadastro="Cadastro de Gênero"
          // esconde o select de genero
        //   visibilidade="none"
          // Define o texto que aparece dentro do campo de input
          placeholder="gênero"
          // ----------------------------------------------------
          // Propriedades voltada ao cadastro:

          //Função que será chamada ao enviar o formulário (onSubmit)
          funcCadastro={editar ? editarFilme : cadastrarFilme}
          //Valor atual do campo de texto
          valor={valor}
          //Função que atualiza o estado do valor no componente pai sempre que o usuário digita no campo
          setValor={setValor}
          btnEditar={editar}
          cancelarEdicao={limparFormulario}
          listaGeneros={listaGeneros}
        />

        <Lista
          tituloLista="Lista de Filmes"
        //   visibilidade="none"
          //Chama o método para validar:
          lista={listaFilmes}
          //Identifica o tipo de lista:
          tipoLista="filme"
          funcExcluir={excluirFilme}
          funcEditar={preEditar}
        />

       </main>
       <Footer />
      </>
    );
};

export default CadastroFilmes