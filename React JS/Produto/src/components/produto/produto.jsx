import "./produto.css"
import { useEffect, useState } from "react"
import img from '../../assets/image.jpg'
import axios from "axios";

export default function Produto() {
    //States e variaveis
    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [imagem, setImagem] = useState(img);
    const [editar, setEditar] = useState(false);

    const [arrProdutos, setArrProdutos] = useState([]);

    //Cliclo de vida e funcoes
    async function cadastrarProduto(e) {
        e.preventDefault()//nao deixa o formulario ser postado

        //validar o formulario
        if (nome.trim().length == 0 ||
         descricao.trim().length == 0 ||
            isNaN(preco) || preco <= 0 ||
             isNaN(quantidade) || quantidade <= 0 
        ) {
            alert("Preencha os campos coretamente")
            return false;
        }

        const objtocadastro = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            imagem: "image.jpg",
        }


        console.log(objtocadastro);


        // cadastrar na API
        try {

            const retornoAPI = await axios.post(`/Produtos`, objtocadastro)

            console.log(retornoAPI);

            if (retornoAPI.status === 201) {
                const dadosCadastrados = await retornoAPI.data;
                console.log(dadosCadastrados);
                setArrProdutos((prev) => [...prev, dadosCadastrados]);

                LimparFormulario();
            } else {
                alert("Nao foi possivel salvar os dados");
            }
        } catch (error) {
            alert("Nao foi possivel salvar os dados");
            console.log(error);
        }

    }

    function LimparFormulario() {
        setId(0)
        setNome("")
        setPreco(0)
        setDescricao("")
        setQuantidade(0)
      

    }

    useEffect(() => {


        getProdutos();

    }, [])

    async function getProdutos() {
            try {
                const retornoAPI = await axios.get("/Produtos")

                const dados = await retornoAPI.data;

                setArrProdutos(dados)
            } catch (error) {
                console.log("Erro ao Buscar os Produtos")
                console.log(error)
            }
        }

    async function deletar(id) {
        if(!confirm("voce quer realmente apagar o produto?")) {
            return false;
        }




        try {
            const retornoAPI = await axios.delete(`/Produtos${id}`)

            if (!retornoAPI.ok) {
                throw new Error(`Erro na API: ${retornoAPI.status}`);
            }

            const novaLista = arrProdutos.filter((prod) => {
                return prod.id != id
            });

            setArrProdutos(novaLista);

        } catch (error) {
            alert("Nao foi possivel deletar o produto");
            console.log(error);
        }
    }

   async function editarProduto(e) {
        e.preventDefault

        
        try {

            const objtocadastro = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            imagem: "image.jpg",
        }


            const retornoAPI = await axios.put(`/Produtos/${id}`, objtocadastro)

            if(retornoAPI.status == 200) {

            getProdutos()
            LimparFormulario()
            setEditar(false)

            }else{
                alert("erro ao editar")
            }

        } catch (error) {
            alert("Erro ao editar o produto")
            console.log(error);


            
        }
    }

    return (
        <>
            <header className="cabecalho">
                <h1 className="titulo--cinza" >SENAI</h1>
                <h1 className="titulo--vermelho">LOJA</h1>
            </header>

            <form className="formzin" action="" onSubmit={(editar) ? editarProduto : cadastrarProduto}>
                {/* <div className="input--image">
                    <input className="input--metade" type="text" id="imagem" placeholder="Image" onChange={(e) => setProduto({ ...produto, imagem: e.target.value })} />
                </div> */}
                <div className="input--dados">l

                    <input
                        className="input--metade"
                        type="text"
                        id="nome"
                        value={nome}
                        placeholder="Nome"
                        onChange={(e) =>
                            setNome(e.target.value)} />


                    <input
                        className="input--metade"
                        type="number"
                        id="preco"
                        value={preco}
                        placeholder="Preço"
                        onChange={(e) =>
                            setPreco(parseFloat(e.target.value))} />


                    <input
                        className="input--metade"
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        laceholder="Quantidade"
                        onChange={(e) =>
                            setQuantidade(parseInt(e.target.value))} />


                    <input
                        className="input--metade"
                        type="text"
                        id="descricao"
                        value={descricao}
                        placeholder="Descrição"
                        onChange={(e) =>
                            setDescricao(e.target.value)} />
                </div>

                {editar && 
                
                <button
                    type="submit"
                    className="btn--cadastro"
                    onClick={() => {
                        setEditar(false);
                        setId(0)
                        LimparFormulario()
                    }} 
                    >
                    
                    Cancelar
                </button>}
                {"  "}

                <button
                    type="submit"
                    className="btn--cadastro">
                    Adicionar Produto
                </button>

            </form>

            <section className="produtos">
                {arrProdutos.map((prod) => (
                    <div key={prod.id} className="produto">
                        <h2>{prod.nome}</h2>
                        <p>Preço: R$ {prod.preco}</p>
                        <p>Descrição: {prod.descricao}</p>
                        <p>Quantidade: {prod.quantidade}</p>
                        <img src={img} alt={prod.nome} />
                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            deletar(prod.id)
                        }}>Apagar</a>

                        <button className="produtos__btn-comprar">Comprar</button>
                        <a href="" onClick={(e) => {

                            e.preventDefault()

                            setEditar(true)
                            setId(prod.id)
                            setNome(prod.nome)
                            setDescricao(prod.descricao)
                            setPreco(prod.preco)
                            setQuantidade(prod.quantidade)

                        }}>editar</a>
                    </div>
                ))}
            </section>
        </>
    )
}