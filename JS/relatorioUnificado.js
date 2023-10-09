"use strict";
// Agora você pode usar a variável listaDespesas para exibir as despesas no HTML
function exibirDespesasHTML() {
    const registoDespesas = document.querySelector("#registro");
    registoDespesas.innerHTML = "";
    listaDespesas.forEach((despesa, index) => {
        const divDespesa = document.createElement('div');
        divDespesa.innerHTML = `
        <div class="despesa">
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
// Chame a função para exibir as despesas quando necessário
exibirDespesasHTML();
