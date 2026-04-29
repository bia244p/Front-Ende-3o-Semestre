function calcular() {
    event.preventDefault();
    //entrada
    let n1 = parseFloat(document.getElementById('n1').value);
    let n2 = parseFloat(document.getElementById("n2").value);
    let op = document.getElementById("operacao").value;//soma
    let resultado = null;

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById('resultado').innerText = 'Preencha todos os números!'
    }


    //processamento
    if (op == 'soma') {
        resultado = somar(n1, n2)
        resultado = resultado.toFixed(2);

    } else if (op == 'subtracao') {
        resultado = subtrair(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'multiplicacao') {
        resultado = multiplicar(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'divisao') {

        if (n2 == 0) {
            resultado = 'Não é um número';
        } else {
            resultado = dividir(n1, n2);
            resultado = resultado.toFixed(2);
        }

    } else {
        resultado = "Operação Inválida";
    }

    //saída
    // console.log(`Resultado da operação: ${resultado}`);
    document.getElementById('resultado').innerHTML = resultado;

    const objetoNumero = {
        n1: n1,
        n2: n2,
        op: op,
        resultado: resultado
    };


    const retorno = cadastrarNaAPI(objetoNumero)
    if (retorno) {
        buscarResultados();

        document.getElementById("n1").value = "";
        document.getElementById("n2").value = "";
        document.getElementById("operacao").value = "";
        document.getElementById("resultado").innerHTML = "";

        alert(`Conta foi cadastrada no banco:
                Primeiro Numero: ${n1}
                Segundo Numero: ${n2}
                Operacao: ${op}
                Resultado: ${resultado}
            `);
    }
    else {
        alert("Nao foi possivel cadastrar!");
    }


}

/**
 * Função somar recebe 2 valores e retorna a soma dos 
 * dois valores
 */
function somar(valor1, valor2) {
    return valor1 + valor2;
}


function subtrair(valor1, valor2) {
    return valor1 - valor2;
}

function multiplicar(valor1, valor2) {
    return valor1 * valor2;
}

function dividir(valor1, valor2) {
    if (valor2 == 0) {
        return 'Não é um número';
    }

    return valor1 / valor2;
}

async function cadastrarNaAPI(objetoNumero) {
    try {
        const resposta = await fetch("http://localhost:3000/calculo", {
            method: "POST",
            body: JSON.stringify(objetoNumero),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function buscarResultados() {
    try {
        const resposta = await fetch("http://localhost:3000/calculo");
        const dados = await resposta.json();

        const container = document.getElementById("cadastro");
        container.innerHTML = "";

        dados.forEach(item => {
            const linha = `
            <article class="data__card-result">
                <span><strong>Primeiro Número:</strong> ${item.n1}</span>
                <span><strong>Segundo Número:</strong> ${item.n2}</span>
                <span><strong>Operação:</strong> ${item.op}</span>
                <span><strong>Resultado:</strong> ${item.resultado}</span>
            </article>`;

            container.innerHTML += linha;
        });

    } catch (error) {
        console.log(error);
    }
}


 