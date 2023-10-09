//enum dos tipos de despesas.
const enum tipos {
    Lanches = "Lanches",
    Livros = "Livros",
    Transporte = "Transporte",
    Material_didático = "Material didático"
};


// Mapeamento do enum tipos.
const tiposMap: { [key: string]: tipos } = {
    "Lanches": tipos.Lanches,
    "Livros": tipos.Livros,
    "Transporte": tipos.Transporte,
    "Material didático": tipos.Material_didático,
};

//Interface das despesas pessoais
interface Despesas {

    // "importação" de ( tipos ) para a interface de despesa para facilitar na criação da lista de despesas
    categoria: tipos;
    descricao: string;
    valor: number;
    date: string;
}


//Funcao para cadastras as despesas.
function cadastrarDespesas() {
    // Obtenha uma coleção de todos os inputs do tipo rádio com o mesmo name
    let radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tipo"]') as NodeListOf<HTMLInputElement>;
    let valorSelecionado: string = "";
    let tipoSelecionado: tipos | undefined = undefined;

    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        };
    };

    // Obtenha o valor do input do id "descricao"
    let descricaoHTML: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
    let descricao: string = descricaoHTML.value;

    // Obtenha o valor do input do id "valor"
    let valorHTML = document.getElementById("valor") as HTMLInputElement;
    let valor: number;
    valor = parseFloat(valorHTML.value);

    // Obtenha o valor do input do id "date"
    let inputDateElement: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
    let valorDate: string = inputDateElement.value;

    validacao(valorSelecionado, descricao, valor, valorDate);
};

//faz uma validaçao dos campos  
function validacao(tipoSelecionado: string, descricao: string, valor: number, valorDate: string) {

    //Faz uma comparacao nos campos para ver se nao estao vazios ou indefinidos.
    if (tipoSelecionado && descricao && valor >= 0 && valorDate) {
        adicionarAoRegistro(tipoSelecionado, descricao, valor, valorDate);
    } else {
            alert("Voce deve informar os campos corretamente!");
        };

    };

//Variável onde a lista de despesas será cadastrada 
let listaDespesas: Despesas[] = [];
//adciona as informacoes ao registro
function adicionarAoRegistro(tipo: string, descricao: string, valor: number, date: string) {

    //Criação do objeto de depesas com os dados que serão fornecidos pelo usuário
    const novaDespesa: Despesas = {
        categoria: tiposMap[tipo],
        descricao,
        valor,
        date,
    };

    let listaSalva = localStorage.getItem("listaDespesas")


    if (listaSalva) {
        listaDespesas = JSON.parse(listaSalva)
    }


    //Adiciona a nova despesa a lista de despesas
    listaDespesas.push(novaDespesa);

    //Salvando a lista dentro do LocalStorage
    localStorage.setItem("listaDespesas", JSON.stringify(listaDespesas));

    //limpa os campos informados
    let descricaoHTML: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
    descricaoHTML.value = '';

    let valorHTML = document.getElementById("valor") as HTMLInputElement;
    valorHTML.value = '';

    let inputDateElement: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
    inputDateElement.value = '';


    //exibi no console as informacoes, logo mais guarda no registro em uma lista
    console.log(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    alert(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    exibirDespesas();


};

// Função para exibir as depesas cadastradas
function exibirDespesas() {
    //Faz a busca do elemento "registro" contido no HTML do projeto
    const registoDespesas: HTMLElement = document.querySelector("#registro") as HTMLElement;

    //Limpa o conteúdo anterior
    registoDespesas.innerHTML = "";

    //Adiciona as informações aos campos
    listaDespesas.forEach((despesa, index) => {
        const divDespesa = document.createElement('div');
        divDespesa.innerHTML = `
        <div class = "despesa">
        <h4>Despesa ${index + 1}</h4>
        <p>Categoria: ${despesa.categoria}</p>
        <p>Descrição: ${despesa.descricao}</p>
        <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
        <p>Data: ${despesa.date}</p>
        </div>
        
        `;
        registoDespesas.appendChild(divDespesa);
    });


}


//Função para Recuperar as despesas e exibi-las em HTML
function recuperarDespesas() {
    let radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tipo"]') as NodeListOf<HTMLInputElement>;
    let valorSelecionado: string = "";
    let tipoSelecionado: string = "";

    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        };
    };
    //Busca as listas guardadas no localStorage para fazer sua recuperação 
    const recuperacaoDeDespesas = JSON.parse(localStorage.getItem("listaDespesas") || ('[]'))!;

    //Buscando elemtendo HTML ao qual será atribuido a exibição das despesas recuperadas    
    const historicoDasDespesas = document.getElementById("historico")!;
    historicoDasDespesas.innerHTML = '';
    //IF verificando se há despesas para exibir

    if (recuperacaoDeDespesas) {
        recuperacaoDeDespesas.forEach((despesa: Despesas, index: number) => {
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
// Adicione um event listener para os radio buttons para chamar recuperarDespesas quando um deles for clicado
document.querySelectorAll('input[name="tipo"]').forEach((radio) => {
    radio.addEventListener("click", recuperarDespesas);
});