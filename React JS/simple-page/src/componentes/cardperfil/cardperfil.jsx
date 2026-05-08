import MyPeople from "../../assets/WIN_20260213_09_08_10_Pro.jpg";
import "./cardperfil.css";

function CardPerfil(){
    return (
        <div class="card-perfil">
           <img class="card-perfil__imagem" src={MyPeople} alt="imagem do usuario" />
         </div>
    )
}

export default CardPerfil