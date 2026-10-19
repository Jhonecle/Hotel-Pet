
/*
    Hotel Pet
    Semana 1 - Navegação com JavaScript e Árvore DOM
*/

// Seleciona os links do menu que possuem o atributo data-navegar
const links = document.querySelectorAll("[data-navegar]");

// Obtém o nome do arquivo HTML que está aberto
const paginaAtual = window.location.pathname.split("/").pop();

// Percorre todos os links encontrados
links.forEach(function(link) {

    // Obtém o destino definido no atributo href
    const destino = link.getAttribute("href");

    // Compara o destino com a página atual
    if (destino === paginaAtual) {

        // Adiciona uma classe CSS ao link correspondente
        link.classList.add("pagina-atual");

        // Identifica o link ativo no console
        console.log("Página atual:", link.textContent.trim());
    }

});
