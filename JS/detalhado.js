"use strict";
;
// Mapeamento do enum tipos.
const tiposMap = {
    "Lanches": "Lanches" /* tipos.Lanches */,
    "Livros": "Livros" /* tipos.Livros */,
    "Transporte": "Transporte" /* tipos.Transporte */,
    "Material didático": "Material did\u00E1tico" /* tipos.Material_didático */,
};
//Funcao para cadastras as despesas.
function cadastrarDespesas() {
    // Obtenha uma coleção de todos os inputs do tipo rádio com o mesmo name
    let radioButtons = document.querySelectorAll('input[name="tipo"]');
    let valorSelecionado = "";
    let tipoSelecionado = undefined;
    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        }
        ;
    }
    ;
    // Obtenha o valor do input do id "descricao"
    let descricaoHTML = document.getElementById("descricao");
    let descricao = descricaoHTML.value;
    // Obtenha o valor do input do id "valor"
    let valorHTML = document.getElementById("valor");
    let valor;
    valor = parseFloat(valorHTML.value);
    // Obtenha o valor do input do id "date"
    let inputDateElement = document.getElementById("data");
    let valorDate = inputDateElement.value;
    validacao(valorSelecionado, descricao, valor, valorDate);
}
;
//faz uma validaçao dos campos  
function validacao(tipoSelecionado, descricao, valor, valorDate) {
    //Faz uma comparacao nos campos para ver se nao estao vazios ou indefinidos.
    if (tipoSelecionado && descricao && valor >= 0 && valorDate) {
        adicionarAoRegistro(tipoSelecionado, descricao, valor, valorDate);
    }
    else {
        alert("Voce deve informar os campos corretamente!");
    }
    ;
}
;
//Variável onde serão cadastradas as despesas em suas respectivas categorias
const despesasPorCategoria = {};
//adciona as informacoes ao registro
function adicionarAoRegistro(tipo, descricao, valor, date) {
    const categoria = tiposMap[tipo];
    //Criação do objeto de depesas com os dados que serão fornecidos
    const novaDespesa = {
        categoria,
        descricao,
        valor,
        date,
    };
    // Verifica se já existe um array para a categoria, se não tiver, será criado um novo
    if (!despesasPorCategoria[categoria]) {
        despesasPorCategoria[categoria] = [];
    }
    //Adiciona a despesa a sua lista de categoria correspondente
    despesasPorCategoria[categoria].push(novaDespesa);
    //Salvando a lista dentro do LocalStorage
    localStorage.setItem("despesasPorCategoria", JSON.stringify(despesasPorCategoria));
    //limpa os campos informados
    let descricaoHTML = document.getElementById("descricao");
    descricaoHTML.value = '';
    let valorHTML = document.getElementById("valor");
    valorHTML.value = '';
    let inputDateElement = document.getElementById("data");
    inputDateElement.value = '';
    //exibi no console as informacoes, logo mais guarda no registro em uma lista
    console.log(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    alert(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    exibirDespesas(categoria);
}
;
// Função para exibir as depesas cadastradas
function exibirDespesas(categoriaSelecionada) {
    //Faz a busca do elemento "registro" contido no HTML do projeto
    const registroDespesas = document.querySelector("#registro");
    //Limpa o conteúdo anterior
    registroDespesas.innerHTML = "";
    if (categoriaSelecionada === "todos") {
        // Exibir todas as despesas
        for (const key in despesasPorCategoria) {
            if (despesasPorCategoria.hasOwnProperty(key)) {
                const categoriaDespesas = despesasPorCategoria[key];
                exibirCategoria(categoriaDespesas, key, registroDespesas);
            }
        }
    }
    else if (despesasPorCategoria.hasOwnProperty(categoriaSelecionada)) {
        // Exibir despesas de uma categoria específica
        const categoriaDespesas = despesasPorCategoria[categoriaSelecionada];
        exibirCategoria(categoriaDespesas, categoriaSelecionada, registroDespesas);
    }
}
// Função para exibir despesas de uma categoria
function exibirCategoria(categoriaDespesas, categoriaNome, registroDespesas) {
    const headerCategoria = document.createElement('h3');
    headerCategoria.textContent = categoriaNome;
    registroDespesas.appendChild(headerCategoria);
    categoriaDespesas.forEach((despesa, index) => {
        const divDespesa = document.createElement('div');
        divDespesa.innerHTML = `
            <div class="despesa">
                <h4>Despesa ${index + 1}</h4>
                <p>Descrição: ${despesa.descricao}</p>
                <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
                <p>Data: ${despesa.date}</p>
            </div>
        `;
        registroDespesas.appendChild(divDespesa);
    });
}
//Função para Recuperar as despesas e exibi-las em HTML
function recuperarDespesas() {
    let radioButtons = document.querySelectorAll('input[name="tipo"]');
    let valorSelecionado = "";
    let tipoSelecionado = "";
    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        }
        ;
    }
    ;
    //Busca as listas guardadas no localStorage para fazer sua recuperação 
    const recuperacaoDeDespesas = JSON.parse(localStorage.getItem("despesasPorCategoria") || ('[]'));
    //Buscando elemento HTML ao qual será atribuido a exibição das despesas recuperadas    
    const historicoDasDespesas = document.getElementById("historico");
    historicoDasDespesas.innerHTML = '';
    //IF verificando se há despesas para exibir
    if (recuperacaoDeDespesas) {
        recuperacaoDeDespesas.forEach((despesa, index) => {
            // Verifica se o tipo selecionado é "todos" ou se corresponde à categoria da despesa
            if (tipoSelecionado === "todos" || tipoSelecionado === despesa.categoria) {
                const divDespesaRecuperada = document.createElement("div");
                divDespesaRecuperada.innerHTML = `
                    <div class="despesa">
                        <h4>Despesa ${index + 1}</h4>
                        <p>Categoria: ${despesa.categoria}</p>
                        <p>Descrição: ${despesa.descricao}</p>
                        <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
                        <p>Data: ${despesa.date}</p>
                    </div>
                `;
                historicoDasDespesas.appendChild(divDespesaRecuperada);
            }
        });
    }
    console.log(recuperacaoDeDespesas);
}
//Função para carregar os dados do localStorage quando a página é carregada
function carregamentoDadosDoLocalStorage() {
    const dadosArmazenados = localStorage.getItem("despesasPorCategoria");
    if (dadosArmazenados) {
        const despesasSalvas = JSON.parse(dadosArmazenados);
        for (const categoria in despesasSalvas) {
            despesasPorCategoria[categoria] = despesasSalvas[categoria];
        }
        exibirDespesas("todos"); // Irá exibir todas as despesas por padrão
    }
}
// Adicione um event listener para os radio buttons para chamar recuperarDespesas quando um deles for clicado
document.querySelectorAll('input[name="tipo"]').forEach((radio) => {
    radio.addEventListener("click", (event) => {
        const categoriaSelecionada = (event === null || event === void 0 ? void 0 : event.target).value;
        exibirDespesas(categoriaSelecionada);
    });
});
//Chama a função  exibirDespesas e carrega os Dados do localStorage quando a página for carregada
exibirDespesas("todos");
carregamentoDadosDoLocalStorage();
