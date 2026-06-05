import "./Botao.css"

const Botao = (props) => {
    return(

        <button 
        className="botao" 
        type={props.btnEditar ? "button" : "submit"}
            onClick={()=>{
                if(props.btnEditar){
                    props.cancelaEdicao()
                }
            }}
        >
            
       {props.nomeDoBotao}
       
       </button>

    )
}

export default Botao;