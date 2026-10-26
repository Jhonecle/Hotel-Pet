
/*
    Hotel Pet
    Semana 2 - Buscas de Pets
*/

// Localiza o formulário na Árvore DOM.
const formularioBuscaPets = document.querySelector("#form-busca-pets");

// Verifica se o formulário existe nesta página.
if (formularioBuscaPets) {

    // Escuta o envio do formulário.
    formularioBuscaPets.addEventListener("submit", function(event) {

        // Impede que a página seja recarregada.
        event.preventDefault();

        // Captura e prepara o texto digitado.
        const pesquisa = document.querySelector("#pesquisa-pets")
            .value.trim().toLowerCase();

        // Localiza todas as linhas da tabela, exceto o cabeçalho.
        const linhas = document.querySelectorAll("#tabela-pets tbody tr");

        // Conta quantos pets correspondem à pesquisa.
        let encontrados = 0;

        // Percorre cada pet da tabela.
        linhas.forEach(function(linha) {

            // Obtém o nome e a raça do pet.
            const nome = linha.cells[0].textContent
                .trim().toLowerCase();

            const raca = linha.cells[2].textContent
                .trim().toLowerCase();

            // Verifica se o nome ou a raça contém o texto pesquisado.
            const corresponde =
                nome.includes(pesquisa) ||
                raca.includes(pesquisa);

            // Mostra ou oculta a linha.
            linha.hidden = !corresponde;

            // Conta os resultados encontrados.
            if (corresponde) {
                encontrados++;
            }
        });

        // Exibe a mensagem conforme o resultado.
        const mensagem = document.querySelector("#mensagem-pets");

        if (encontrados === 0) {
            mensagem.textContent = "Nenhum pet encontrado.";
        } else {
            mensagem.textContent =
                encontrados + " pet(s) encontrado(s).";
        }
    });

    // Trata o botão Limpar.
    formularioBuscaPets.addEventListener("reset", function() {

        // Aguarda a limpeza do campo pelo navegador.
        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-pets tbody tr"
            );

            // Torna todos os pets visíveis novamente.
            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            // Limpa a mensagem.
            document.querySelector("#mensagem-pets").textContent = "";

        }, 0);
    });
}
