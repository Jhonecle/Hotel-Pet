
/*
    Hotel Pet
    Buscas de Pets, Reservas e Usuários
    JavaScript puro e Árvore DOM
*/


// ==================================================
// 1. BUSCA DE PETS POR NOME OU RAÇA
// ==================================================

const formularioBuscaPets = document.querySelector("#form-busca-pets");

if (formularioBuscaPets) {

    formularioBuscaPets.addEventListener("submit", function(event) {

        // Impedir o recarregamento da página
        event.preventDefault();

        // Recuperar o texto pesquisado
        const pesquisa = document.querySelector("#pesquisa-pets")
            .value.trim().toLowerCase();

        // Recuperar as linhas da tabela
        const linhas = document.querySelectorAll("#tabela-pets tbody tr");

        let encontrados = 0;

        // Percorrer os pets cadastrados
        linhas.forEach(function(linha) {

            const nome = linha.cells[0].textContent.toLowerCase();
            const raca = linha.cells[2].textContent.toLowerCase();

            // Verificar nome ou raça
            const corresponde =
                nome.includes(pesquisa) ||
                raca.includes(pesquisa);

            // Mostrar ou esconder a linha
            linha.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        // Exibir mensagem
        const mensagem = document.querySelector("#mensagem-pets");

        if (mensagem) {

            if (encontrados === 0) {
                mensagem.textContent = "Nenhum pet encontrado.";
            } else {
                mensagem.textContent =
                    encontrados + " pet(s) encontrado(s).";
            }
        }
    });

    // Limpar a pesquisa
    formularioBuscaPets.addEventListener("reset", function() {

        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-pets tbody tr"
            );

            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            const mensagem = document.querySelector("#mensagem-pets");

            if (mensagem) {
                mensagem.textContent = "";
            }

        }, 0);
    });
}


// ==================================================
// 2. BUSCA DE RESERVAS
// ==================================================

const formularioBuscaReservas =
    document.querySelector("#form-busca-reservas");

if (formularioBuscaReservas) {

    formularioBuscaReservas.addEventListener("submit", function(event) {

        event.preventDefault();

        const pesquisa = document.querySelector("#pesquisa-reservas")
            .value.trim().toLowerCase();

        const linhas = document.querySelectorAll(
            "#tabela-reservas tbody tr"
        );

        let encontrados = 0;

        linhas.forEach(function(linha) {

            const id = linha.cells[0].textContent.toLowerCase();
            const pet = linha.cells[1].textContent.toLowerCase();
            const proprietario = linha.cells[2].textContent.toLowerCase();
            const status = linha.cells[4].textContent.toLowerCase();

            const corresponde =
                id.includes(pesquisa) ||
                pet.includes(pesquisa) ||
                proprietario.includes(pesquisa) ||
                status.includes(pesquisa);

            linha.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        const mensagem = document.querySelector("#mensagem-reservas");

        if (mensagem) {

            if (encontrados === 0) {
                 mensagem.textContent = "Nenhuma reserva encontrada.";
             } else {
                 mensagem.textContent =
                     encontrados + " reserva(s) encontrada(s).";
    }
}
    });

    formularioBuscaReservas.addEventListener("reset", function() {

        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-reservas tbody tr"
            );

            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            document.querySelector("#mensagem-reservas").textContent = "";

        }, 0);
    });
}


// ==================================================
// 3. BUSCA DE USUÁRIOS POR NOME OU E-MAIL
// ==================================================

const formularioBuscaUsuarios =
    document.querySelector("#form-busca-usuarios");

if (formularioBuscaUsuarios) {

    formularioBuscaUsuarios.addEventListener("submit", function(event) {

        event.preventDefault();

        const pesquisa = document.querySelector("#pesquisa-usuarios")
            .value.trim().toLowerCase();

        const linhas = document.querySelectorAll(
            "#tabela-usuarios tbody tr"
        );

        let encontrados = 0;

        linhas.forEach(function(linha) {

            const nome = linha.cells[0].textContent.toLowerCase();
            const email = linha.cells[1].textContent.toLowerCase();

            const corresponde =
                nome.includes(pesquisa) ||
                email.includes(pesquisa);

            linha.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        const mensagem = document.querySelector("#mensagem-usuarios");

        if (mensagem) {

    if (encontrados === 0) {
        mensagem.textContent = "Nenhum usuário encontrado.";
    } else {
        mensagem.textContent =
            encontrados + " usuário(s) encontrado(s).";
    }
}
    });

    formularioBuscaUsuarios.addEventListener("reset", function() {

        setTimeout(function() {

            const linhas = document.querySelectorAll(
                "#tabela-usuarios tbody tr"
            );

            linhas.forEach(function(linha) {
                linha.hidden = false;
            });

            document.querySelector("#mensagem-usuarios").textContent = "";

        }, 0);
    });
}

