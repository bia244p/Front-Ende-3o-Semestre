import Produto from "../exercicio02/produtos"
import "./produtos.css"

export default function Produtos() {
    const  produtos = [
        {
            nome: "Tenisn de marca",
            preco: 550,
            descricao: "tenis chique!"
        },
    
        {
            nome: "Bolsa",
            preco: 55,
            descricao: " bolsa de couro!"
        },
    
        {e           nome: "camiseta",
            preco: 100,
            descricao: "chique!"
        },

    ]
    
    return(
        produtos.map((produtinho) => {
            return (
                <Produto 
                   nome={produtinho.nome}
                   preco={produtinho.preco}
                   descricao={produtinho.descricao}
                
                
                />
            )
        })
    )
}