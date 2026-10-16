/*
  Hotel Pet
  Atividade: Navegação com JavaScript
*/

// Seleciona todos os links marcados para navegação
const links = document.querySelectorAll("[data-navegar]");

// Percorre todos os links encontrados
links.forEach(function(link) {

    // Identifica quando o usuário clica em um link
    link.addEventListener("click", function(event) {

        // Impede a navegação padrão do HTML
        event.preventDefault();

        // Obtém o endereço da página de destino
        const destino = link.getAttribute("href");

        // Redireciona o usuário para a página
        window.location.href = destino;

    });

});