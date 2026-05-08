import './Title.css';

function Title(props){
    return(
        <h1>
            {props.texto} {props.titulo}
        </h1>
    );
}

export default Title;