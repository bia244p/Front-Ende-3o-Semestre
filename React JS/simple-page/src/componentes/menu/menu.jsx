
import CardPerfil from "../cardperfil/cardperfil";
import "./menu.css";



function Menu() {
    return (

         <nav  class="menu">

            <a href="#" className=" menu__item">Home</a>
            <a href="#" className=" menu__item">Quem somos</a>  
            <a href="#" className=" menu__item">contato</a>
            <a href="#" className=" menu__item menu__item--signin">entra</a>
            <a href="#" className=" menu__item menu__item--signup">Cadastra</a>
            
         <CardPerfil />
        </nav>
    
        
      
        
    );
}

export default Menu;