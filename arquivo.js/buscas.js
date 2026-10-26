
/*
    Hotel Pet
    Semana 2 - Buscas
    JavaScript puro e Árvore DOM
*/

// 1. BUSCA DE PETS POR NOME OU RAÇA


const formularioBuscaPets =
    document.querySelector("#form-busca-pets");

if (formularioBuscaPets) {

    formularioBuscaPets.addEventListener("submit", function(event) {

        // Impede o recarregamento da página.
        event.preventDefault();

        // Obtém o texto digitado.
        const pesquisa = document.querySelector("#pesquisa-pets")
            .value.trim().toLowerCase();

        // Seleciona as linhas da tabela.
        const linhas = document.querySelectorAll(
            "#tabela-pets tbody tr"
        );

        let encontrados = 0;

        linhas.forEach(function(linha) {

            // Coluna 1: Nome.
            const nome = linha.cells[0].textContent
                .trim().toLowerCase();

            // Coluna 3: Raça.
            const raca = linha.cells[2].textContent
                .trim().toLowerCase();

            // Verifica o nome ou a raça.
            const corresponde =
                nome.includes(pesquisa) ||
                raca.includes(pesquisa);

            // Exibe ou oculta a linha.
            linha.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        // Mostra o resultado da pesquisa.
        const mensagem = document.querySelector("#mensagem-pets");

        if (encontrados === 0) {
            mensagem.textContent = "Nenhum pet encontrado.";
        } else {
            mensagem.textContent =
                encontrados + " pet(s) encontrado(s).";
        }
    });

    // Botão Limpar da busca de pets.
    formularioBuscaPets.addEventListener("reset", function() {

        // O navegador limpa o campo após o evento reset.
        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-pets tbody tr"
            );

            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            document.querySelector("#mensagem-pets").textContent = "";

        }, 0);
    });
}


// 2. BUSCA DE RESERVAS
// POR ID, PET, PROPRIETÁRIO OU STATUS

const formularioBuscaReservas =
    document.querySelector("#form-busca-reservas");

if (formularioBuscaReservas) {

    formularioBuscaReservas.addEventListener(
        "submit",
        function(event) {

            // Impede o recarregamento da página.
            event.preventDefault();

            // Obtém o texto digitado.
            const pesquisa = document.querySelector(
                "#pesquisa-reservas"
            ).value.trim().toLowerCase();

            // Seleciona as linhas da tabela.
            const linhas = document.querySelectorAll(
                "#tabela-reservas tbody tr"
            );

            let encontrados = 0;

            linhas.forEach(function(linha) {

                // Coluna 1: ID da reserva.
                const id = linha.cells[0].textContent
                    .trim().toLowerCase();

                // Coluna 2: Nome do pet.
                const pet = linha.cells[1].textContent
                    .trim().toLowerCase();

                // Coluna 3: Proprietário.
                const proprietario = linha.cells[2].textContent
                    .trim().toLowerCase();

                // Coluna 5: Status da reserva.
                const status = linha.cells[4].textContent
                    .trim().toLowerCase();

                // Verifica os quatro campos.
                const corresponde =
                    id.includes(pesquisa) ||
                    pet.includes(pesquisa) ||
                    proprietario.includes(pesquisa) ||
                    status.includes(pesquisa);

                // Exibe ou oculta a linha.
                linha.hidden = !corresponde;

                if (corresponde) {
                    encontrados++;
                }
            });

            // Mostra a mensagem dos resultados.
            const mensagem = document.querySelector(
                "#mensagem-reservas"
            );

            if (encontrados === 0) {
                mensagem.textContent =
                    "Nenhuma reserva encontrada.";
            } else {
                mensagem.textContent =
                    encontrados + " reserva(s) encontrada(s).";
            }
        }
    );

    // Botão Limpar da busca de reservas.
    formularioBuscaReservas.addEventListener("reset", function() {

        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-reservas tbody tr"
            );

            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            document.querySelector(
                "#mensagem-reservas"
            ).textContent = "";

        }, 0);
    });
}
