import { useState } from 'react';
import './App.css'
import Contador from '../componentes/contador/contador';
import FormulariState from '../componentes/formulariostate/formulariostate';
import CadFruta from '../componentes/cadfruta/cadfruta';

function App() {

  const [titulo, setTitulo] =useState("Google");

  function mudarTexto(){
    setTitulo= ("Microsoft")
  }

 function mudarTexto2(){
    setTitulo= ("Adenicon")
  }
  
  return(
    <>
    {/* <h1> Minha Página de {Contador} </h1>
    <button onClick={mudarTexto}>Mudar Tetxo</button> 
    <br />
    <button onClick={mudarTexto2}>Adenicon</button>

     <Contador />
     <br />

     <FormulariState /> */}
     <CadFruta/>
    </>
    
  );
  
  
}

export default App
