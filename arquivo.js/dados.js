/*
    Hotel Pet
    Cadastro e exibição de Pets
*/

 // Recuperar os pets cadastrados
let petsIniciais = JSON.parse(localStorage.getItem("pets")) || [];

// Verificar se Berg já está cadastrado
let bergExiste = petsIniciais.some(function(pet) {
    return pet.nome === "Berg";
});

// Adicionar Berg caso não exista
if (!bergExiste) {
    petsIniciais.push({
        nome: "Berg",
        tipo: "Cachorro",
        raca: "Vira lata",
        tamanho: "Grande",
        proprietario: "Geovane Oliveira"
    });
}

// Verificar se Lara já está cadastrada
let laraExiste = petsIniciais.some(function(pet) {
    return pet.nome === "Lara";
});

// Adicionar Lara caso não exista
if (!laraExiste) {
    petsIniciais.push({
        nome: "Lara",
        tipo: "Gata",
        raca: "Siamês",
        tamanho: "Pequeno",
        proprietario: "Maria das Graças"
    });
}

// Salvar a lista atualizada
localStorage.setItem("pets", JSON.stringify(petsIniciais));


// Verificar se os pets iniciais já foram adicionados
if (localStorage.getItem("pets-iniciais-adicionados") === null) {

    // Recuperar os pets cadastrados
    let petsIniciais = JSON.parse(localStorage.getItem("pets")) || [];

    // Adicionar os pets iniciais
    petsIniciais.push(
        {
            nome: "Berg",
            tipo: "Cachorro",
            raca: "Vira lata",
            tamanho: "Grande",
            proprietario: "Geovane Oliveira"
        },
        {
            nome: "Lara",
            tipo: "Gata",
            raca: "Siamês",
            tamanho: "Pequeno",
            proprietario: "Maria das Graças"
        }
    );

    // Salvar os pets no navegador
    localStorage.setItem("pets", JSON.stringify(petsIniciais));

    // Registrar que os pets iniciais já foram adicionados
    localStorage.setItem("pets-iniciais-adicionados", "sim");
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
const formularioEdicao = document.getElementById("form-editar-pet");

if (formularioEdicao) {

    // Recuperar o índice do pet pela URL
    const parametros = new URLSearchParams(window.location.search);
    const indice = parametros.get("indice");

    // Recuperar os pets armazenados
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Buscar o pet selecionado
    let pet = indice !== null ? pets[Number(indice)] : undefined;

    // Verificar se o pet existe
    if (pet) {

        // Preencher os campos do formulário
        document.getElementById("nome").value = pet.nome;
        document.getElementById("tipo").value = pet.tipo;
        document.getElementById("raca").value = pet.raca;
        document.getElementById("tamanho").value = pet.tamanho;

        // Quando clicar em salvar
        formularioEdicao.addEventListener("submit", function(event) {

            // Impedir o recarregamento da página
            event.preventDefault();

            // Atualizar os dados do pet
            pet.nome = document.getElementById("nome").value;
            pet.tipo = document.getElementById("tipo").value;
            pet.raca = document.getElementById("raca").value;
            pet.tamanho = document.getElementById("tamanho").value;

            // Atualizar a lista de pets
            pets[indice] = pet;

            // Salvar no localStorage
            localStorage.setItem("pets", JSON.stringify(pets));

            alert("Pet atualizado com sucesso!");

            // Voltar para a listagem
            window.location.href = "pets.html";
        });

    } else {
        alert("Pet não encontrado!");
    }
}

