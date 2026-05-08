import './Subtitle.css';

function Subtitle(props){
    return(
        <h2> 
            {props.texto} {props.bia}

        </h2>
    );
}

export default Subtitle;