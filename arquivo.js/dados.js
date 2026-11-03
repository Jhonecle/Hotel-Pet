
/*
    Hotel Pet
    Cadastro, exibição e edição de Pets
*/

// ==========================================
// 1. INICIALIZAÇÃO DOS PETS
// ==========================================

// Recuperar os pets cadastrados
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// Verificar se Berg já existe
let bergExiste = pets.some(function(pet) {
    return pet.nome === "Berg";
});

// Adicionar Berg somente se não existir
if (!bergExiste) {
    pets.push({
        nome: "Berg",
        tipo: "Cachorro",
        raca: "Vira lata",
        tamanho: "Grande",
        proprietario: "Geovane Oliveira"
    });
}

// Verificar se Lara já existe
let laraExiste = pets.some(function(pet) {
    return pet.nome === "Lara";
});

// Adicionar Lara somente se não existir
if (!laraExiste) {
    pets.push({
        nome: "Lara",
        tipo: "Gata",
        raca: "Siamês",
        tamanho: "Pequeno",
        proprietario: "Maria das Graças"
    });
}

// Salvar os pets no navegador
localStorage.setItem("pets", JSON.stringify(pets));


// ==========================================
// 2. CADASTRO DE NOVOS PETS
// ==========================================

const formularioPet = document.querySelector("#form-novo-pet");

if (formularioPet) {

    formularioPet.addEventListener("submit", function(event) {

        // Impedir que a página seja recarregada
        event.preventDefault();

        // Recuperar os dados preenchidos
        const novoPet = {
            nome: document.getElementById("nome").value,
            tipo: document.getElementById("tipo").value,
            raca: document.getElementById("raca").value,
            tamanho: document.getElementById("tamanho").value,
            proprietario: document.getElementById("proprietario").value
        };

        // Recuperar a lista de pets
        let pets = JSON.parse(localStorage.getItem("pets")) || [];

        // Adicionar o novo pet
        pets.push(novoPet);

        // Salvar a lista atualizada
        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet cadastrado com sucesso!");

        // Voltar para a listagem
        window.location.href = "pets.html";
    });
}


// ==========================================
// 3. LISTAGEM DOS PETS
// ==========================================

const tabelaPets = document.querySelector("#tabela-pets tbody");

if (tabelaPets) {

    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Limpar a tabela antes de preencher
    tabelaPets.innerHTML = "";

    pets.forEach(function(pet, indice) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pet.nome}</td>
            <td>${pet.tipo}</td>
            <td>${pet.raca}</td>
            <td>${pet.tamanho}</td>
            <td>${pet.proprietario}</td>
            <td>
                <a href="ver-pet.html?indice=${indice}">
                    Visualizar
                </a>
                |
                <a href="editar-pet.html?indice=${indice}">
                    Editar
                </a>
            </td>
        `;

        tabelaPets.appendChild(linha);
    });
}


// ==========================================
// 4. EDIÇÃO DOS PETS
// ==========================================

const formularioEdicao = document.getElementById("form-editar-pet");

if (formularioEdicao) {

    // Recuperar o índice do pet pela URL
    const parametros = new URLSearchParams(window.location.search);
    const indice = Number(parametros.get("indice"));

    // Recuperar os pets cadastrados
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Localizar o pet selecionado
    let pet = pets[indice];

    if (parametros.get("indice") !== null &&
        Number.isInteger(indice) &&
        indice >= 0 &&
        pet) {

        // Preencher os campos do formulário
        document.getElementById("nome").value = pet.nome;
        document.getElementById("tipo").value = pet.tipo;
        document.getElementById("raca").value = pet.raca;
        document.getElementById("tamanho").value = pet.tamanho;
        document.getElementById("proprietario").value = pet.proprietario;

        formularioEdicao.addEventListener("submit", function(event) {

            event.preventDefault();

            // Atualizar os dados do pet
            pet.nome = document.getElementById("nome").value;
            pet.tipo = document.getElementById("tipo").value;
            pet.raca = document.getElementById("raca").value;
            pet.tamanho = document.getElementById("tamanho").value;
            pet.proprietario = document.getElementById("proprietario").value;

            // Atualizar a lista
            pets[indice] = pet;

            // Salvar no navegador
            localStorage.setItem("pets", JSON.stringify(pets));

            alert("Pet atualizado com sucesso!");

            // Voltar para a listagem
            window.location.href = "pets.html";
        });

    } else {
        alert("Pet não encontrado!");
        window.location.href = "pets.html";
    }
}


