/*
    Hotel Pet
    Cadastro e exibição de Pets
*/

// Verifica se estamos na página de cadastro.
const formularioPet = document.querySelector("#form-novo-pet");

if (formularioPet) {

    formularioPet.addEventListener("submit", function(event) {

        // Impede que a página seja recarregada.
        event.preventDefault();

        // Obtém os dados do formulário.
        const nome = document.querySelector("#nome").value;
        const tipo = document.querySelector("#tipo").value;
        const raca = document.querySelector("#raca").value;
        const tamanho = document.querySelector("#tamanho").value;
        const proprietario = document.querySelector("#proprietario").value;

        // Cria um objeto com os dados do pet.
        const novoPet = {
            nome: nome,
            tipo: tipo,
            raca: raca,
            tamanho: tamanho,
            proprietario: proprietario
        };

        // Recupera os pets já salvos.
        let pets = JSON.parse(localStorage.getItem("pets")) || [];

        // Adiciona o novo pet.
        pets.push(novoPet);

        // Salva a lista atualizada no navegador.
        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet cadastrado com sucesso!");

        // Volta para a página de pets.
        window.location.href = "pets.html";
    });
}


// Exibe os pets salvos na tabela.
const tabelaPets = document.querySelector("#tabela-pets tbody");

if (tabelaPets) {

    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    pets.forEach(function(pet) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pet.nome}</td>
            <td>${pet.tipo}</td>
            <td>${pet.raca}</td>
            <td>${pet.tamanho}</td>
            <td>${pet.proprietario}</td>
            <td>
                <a href="ver-pet.html">Visualizar</a>
                |
                <a href="editar-pet.html">Editar</a>
            </td>
        `;

        tabelaPets.appendChild(linha);
    });
}