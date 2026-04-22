function calcular(){
   // alert("função Calcular rodando!!");
   
   const nome = document.getElementById("nome").value;
   const altura = parseFloat(document.getElementById("altura").Value);
   const peso = parseFloat(document.getElementById("peso").value);

   console.log(altura);
   console.log(peso);

   if(nome.trim().length == 0 || isNaN(altura) || isNaN(peso)){
    alert("Preencha todos os campos: Nome, Altura e Peso");
    return false;
   }

   const IMC = calcularImc(altura,peso);
   const textoSituacao = gerarTextoImc(IMC);

   console.log(nome);
   console.log(altura);
   console.log(peso);
   console.log(IMC);
   console.log(textoSituacao);

}

   function calcularImc(altura,peso) {
    return peso/ (altura * altura);
   }

   function calcularImc(IMC){
    if (IMC < 16){
        return "Magreza grave";
    } else if(IMC > 17)
        return "Magreza moderada";
     else if(IMC < 18,5){

            return "Magreza leve"
        }
        else if(IMC < 25){

            return "Saudavel"
        }
        else if(IMC < 30){

            return "Sobrepeso"
        }
        else if(IMC < 35){

            return "Obesidade Grau 1"
        }
        else if(IMC < 40){

            return "Obesidade Grau 2 (Considerada severa)"
        }
        else if(IMC > 40){

            return "Obesidade Grau 3 (Considerada Morbida)"
        }
    }
