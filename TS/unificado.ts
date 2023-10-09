import { Despesas,tiposMap } from "./addDespesa";

function recuperarDespesas(categoria:string) {
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
    const recuperacaoDeDespesas = JSON.parse(localStorage.getItem("despesasPorCategoria") || ('[]'))!;

    //Buscando elemento HTML ao qual será atribuido a exibição das despesas recuperadas    
    const historicoDasDespesas = document.getElementById("historico")!;
    historicoDasDespesas.innerHTML = '';
    //IF verificando se há despesas para exibir

    if (recuperacaoDeDespesas[categoria]) {
        // Adiciona um cabeçalho com o nome da categoria
        const headerCategoria = document.createElement('h3');
        headerCategoria.textContent = categoria;
        historicoDasDespesas.appendChild(headerCategoria);

        // Adiciona as informações das despesas da categoria atual
        recuperacaoDeDespesas[categoria].forEach((despesa:Despesas, index:number) => {
            const divDespesa = document.createElement('div');
            divDespesa.innerHTML = `
                <div class="despesa">
                    <h4>Despesa ${index + 1}</h4>
                    <p>Descrição: ${despesa.categoria}</p>
                    <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
                </div>
            `;

            historicoDasDespesas.appendChild(divDespesa);
        });
    } else {
        // Se não houver despesas na categoria, exibe uma mensagem
        const mensagemSemDespesas = document.createElement('div');
        mensagemSemDespesas.innerHTML = `<div class="despesa"> Nenhuma despesa encontrada para esta categoria. </div> `;
        historicoDasDespesas.appendChild(mensagemSemDespesas);
    }

}
document.querySelectorAll('input[name="tipo"]').forEach((radio) => {
    radio.addEventListener("click", (event) => {

        const categoriaSelecionada = (event?.target as HTMLInputElement).value;
        recuperarDespesas(categoriaSelecionada);
    });
});