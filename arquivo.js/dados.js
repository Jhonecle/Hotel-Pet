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

    pets.forEach(function(pet, indice) {

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
                <a href="editar-pet.html?indice=${indice}">Editar</a>
            </td>
        `;

        tabelaPets.appendChild(linha);
    });
}


// Verificar se estamos na página de editar pet
if (document.getElementById("form-editar-pet")) {

    // Recuperar o índice do pet pela URL
    const parametros = new URLSearchParams(window.location.search);
    const indice = parametros.get("indice");

    // Recuperar os pets armazenados
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Buscar o pet selecionado
    let pet = pets[indice];

    // Verificar se o pet existe
    if (pet) {

        // Preencher os campos do formulário
        document.getElementById("nome").value = pet.nome;
        document.getElementById("tipo").value = pet.tipo;
        document.getElementById("raca").value = pet.raca;
        document.getElementById("tamanho").value = pet.tamanho;

    } else {
        alert("Pet não encontrado!");
    }
}
