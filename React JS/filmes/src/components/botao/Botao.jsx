import "./Botao.css"

const Botao = (props) => {
    return(

        <button 
        className="botao" 
        type={ (props.btnEditar || props.btnLogin )  ? "button" : "submit"}
            onClick={()=>{
                if(props.btnEditar){
                    props.cancelaEdicao()
                }else if (props.btnLogin) {
                    props.fnLogin()
                }else{
                    null
                }

            }}
        >
            
       {props.nomeDoBotao}
       
       </button>

    )
}

export default Botao;