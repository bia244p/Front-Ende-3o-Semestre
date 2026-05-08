import "./produtos.css"

function Produto({nome, preco, descricao}){
    return(
        <p>
            Nome do Produto: {nome} <br />
            Preço R$ {preco} <br />
            Decrição: {descricao} <br />
        </p>
    )

}

export default Produto