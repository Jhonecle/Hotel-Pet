
/*
    Hotel Pet
    Inicialização dos pets
*/

// Recuperar os pets cadastrados
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// Verificar se os pets iniciais já foram adicionados
if (localStorage.getItem("pets-iniciais-adicionados") === null) {

    // Adicionar os pets somente se o armazenamento estiver vazio
    if (pets.length === 0) {

        pets.push(
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
    }

    // Salvar os pets
    localStorage.setItem("pets", JSON.stringify(pets));

    // Registrar que a inicialização foi realizada
    localStorage.setItem("pets-iniciais-adicionados", "sim");
}



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
/*
    ==========================================
    5. VISUALIZAÇÃO INDIVIDUAL DOS PETS
    ==========================================
*/

// Verificar se estamos na página de visualizar pet
const dadosPet = document.getElementById("dados-pet");

if (dadosPet) {

    // Recuperar o índice enviado pela URL
    const parametros = new URLSearchParams(window.location.search);

    const indiceTexto = parametros.get("indice");

    const indice = Number(indiceTexto);

    // Recuperar os pets cadastrados
    const listaPetsVisualizacao =
        JSON.parse(localStorage.getItem("pets")) || [];

    // Localizar o pet selecionado
    const pet = listaPetsVisualizacao[indice];

    // Verificar se o pet existe
    if (
        indiceTexto !== null &&
        indiceTexto.trim() !== "" &&
        Number.isInteger(indice) &&
        indice >= 0 &&
        pet
    ) {

        // Exibir os dados do animal
        document.getElementById("nome").textContent = pet.nome;

        document.getElementById("tipo").textContent = pet.tipo;

        document.getElementById("raca").textContent = pet.raca;

        document.getElementById("tamanho").textContent = pet.tamanho;

        document.getElementById("proprietario").textContent =
            pet.proprietario;

        // Preparar o link para editar o pet selecionado
        document.getElementById("link-editar-pet").href =
            "editar-pet.html?indice=" + indice;

    } else {

        alert("Pet não encontrado!");

        window.location.href = "pets.html";
    }
}

// ==========================================
// 6. CADASTRAR E LISTAR RESERVAS
// ==========================================

// Recupera as reservas salvas
let reservasHotel = JSON.parse(localStorage.getItem("reservas")) || [];

// Elementos da página de nova reserva
const formularioNovaReserva = document.querySelector("#form-nova-reserva");
const selecaoPetReserva = document.querySelector("#pet");

// Preenche a lista de pets automaticamente
if (selecaoPetReserva) {

    selecaoPetReserva.innerHTML = '<option value="">Selecione um pet</option>';

    pets.forEach((pet, indice) => {
        const opcao = document.createElement("option");

        opcao.value = indice;
        opcao.textContent = pet.nome;

        selecaoPetReserva.appendChild(opcao);
    });
}

// Formata a data para o padrão brasileiro
function formatarDataReserva(data) {
    if (!data) return "";
    return data.split("-").reverse().join("/");
}

// Salva uma nova reserva
if (formularioNovaReserva) {

    formularioNovaReserva.addEventListener("submit", function(event) {

        event.preventDefault();

        const indicePet = selecaoPetReserva.value;
        const petSelecionado = pets[indicePet];

        if (!petSelecionado) {
            alert("Selecione um pet.");
            return;
        }

        const dataInicio = document.querySelector("#inicio").value;
        const dataFim = document.querySelector("#fim").value;

        if (dataFim < dataInicio) {
            alert("A data de término não pode ser anterior à data de início.");
            return;
        }

        const proximoId = reservasHotel.length > 0
            ? Math.max(...reservasHotel.map(reserva => Number(reserva.id))) + 1
            : 1;

        const novaReserva = {
            id: proximoId,
            pet: petSelecionado.nome,
            proprietario: petSelecionado.proprietario,
            inicio: dataInicio,
            fim: dataFim,
            informacoes: document.querySelector("#informacoes").value,
            status: "Agendada"
        };

        reservasHotel.push(novaReserva);

        localStorage.setItem("reservas", JSON.stringify(reservasHotel));

        alert("Reserva cadastrada com sucesso!");

        formularioNovaReserva.reset();
    });
}

// Exibe as reservas na tabela
const tabelaReservasHotel = document.querySelector("#tabela-reservas tbody");

if (tabelaReservasHotel) {

    tabelaReservasHotel.innerHTML = "";

    reservasHotel.forEach(reserva => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${reserva.id}</td>
            <td>${reserva.pet}</td>
            <td>${reserva.proprietario}</td>
            <td>${formatarDataReserva(reserva.inicio)} até ${formatarDataReserva(reserva.fim)}</td>
            <td>${reserva.status}</td>
            <td>
                <a href="ver-reserva.html?id=${reserva.id}">
                Visualizar
                </a>
                |
                <a href="editar-reserva.html?id=${reserva.id}">
                    Editar
                </a>
                |
                <a href="#" onclick="excluirReserva(${reserva.id})">
                    Excluir
                </a>
            </td>
        `;

        tabelaReservasHotel.appendChild(linha);
    });
}

 // ==========================================
 // 6.2. VISUALIZAR DETALHES DA RESERVA
 // ==========================================

const idReservaVisualizar = new URLSearchParams(window.location.search).get("id");

const campoIdReserva = document.querySelector("#id");

if (campoIdReserva) {

    const reservaSelecionada = reservasHotel.find(
        reserva => String(reserva.id) === idReservaVisualizar
    );

    if (reservaSelecionada) {

        document.querySelector("#id").textContent = reservaSelecionada.id;
        document.querySelector("#pet").textContent = reservaSelecionada.pet;
        document.querySelector("#proprietario").textContent = reservaSelecionada.proprietario;
        document.querySelector("#inicio").textContent = formatarDataReserva(reservaSelecionada.inicio);
        document.querySelector("#fim").textContent = formatarDataReserva(reservaSelecionada.fim);
        document.querySelector("#status").textContent = reservaSelecionada.status;
        document.querySelector("#informacoes").textContent =
            reservaSelecionada.informacoes || "Nenhuma informação cadastrada.";

        document.querySelector("#link-editar-reserva").href =
            `editar-reserva.html?id=${reservaSelecionada.id}`;

    } else {

        document.querySelector("h2").textContent = "Reserva não encontrada";
    }
}


 // ==========================================
 // 6.3. EDITAR RESERVAS
 // ==========================================

// Recupera o ID da reserva pelo endereço
const idReservaEdicao = new URLSearchParams(window.location.search).get("id");

// Localiza o formulário de edição
const formularioEditarReserva = document.querySelector("#form-editar-reserva");

if (formularioEditarReserva) {

    // Procura a reserva pelo ID
    const indiceReservaEdicao = reservasHotel.findIndex(
        reserva => String(reserva.id) === idReservaEdicao
    );

    if (indiceReservaEdicao !== -1) {

        const reservaEdicao = reservasHotel[indiceReservaEdicao];

        // Preenche a lista de pets
        const selecaoPetEdicao = document.querySelector("#pet");

        pets.forEach((pet, indice) => {

            const opcao = document.createElement("option");

            opcao.value = indice;
            opcao.textContent = pet.nome;

            selecaoPetEdicao.appendChild(opcao);
        });

        // Identifica o pet da reserva
        const indicePetAtual = pets.findIndex(
            pet => pet.nome === reservaEdicao.pet
        );

        // Preenche os campos com os dados atuais
        document.querySelector("#id-reserva").value = reservaEdicao.id;

        if (indicePetAtual !== -1) {
            selecaoPetEdicao.value = indicePetAtual;
        }

        document.querySelector("#inicio").value = reservaEdicao.inicio;
        document.querySelector("#fim").value = reservaEdicao.fim;
        document.querySelector("#informacoes").value = reservaEdicao.informacoes || "";
        document.querySelector("#status").value = reservaEdicao.status;

        // Salva as alterações
        formularioEditarReserva.addEventListener("submit", function(event) {

            event.preventDefault();

            const indicePetSelecionado = selecaoPetEdicao.value;
            const petSelecionado = pets[indicePetSelecionado];

            if (!petSelecionado) {
                alert("Selecione um pet.");
                return;
            }

            const novaDataInicio = document.querySelector("#inicio").value;
            const novaDataFim = document.querySelector("#fim").value;

            if (novaDataFim < novaDataInicio) {
                alert("A data de término não pode ser anterior à data de início.");
                return;
            }

            // Atualiza a reserva sem alterar seu ID
            reservasHotel[indiceReservaEdicao] = {
                id: reservaEdicao.id,
                pet: petSelecionado.nome,
                proprietario: petSelecionado.proprietario,
                inicio: novaDataInicio,
                fim: novaDataFim,
                informacoes: document.querySelector("#informacoes").value,
                status: document.querySelector("#status").value
            };

            // Atualiza o armazenamento
            localStorage.setItem("reservas", JSON.stringify(reservasHotel));

            alert("Reserva atualizada com sucesso!");

            window.location.href = "reservas.html";
        });

    } else {

        alert("Reserva não encontrada.");
        window.location.href = "reservas.html";
    }
}



// ==========================================
// 7. CADASTRAR E LISTAR USUÁRIOS
// ==========================================

// Recupera os usuários salvos
let usuariosHotel = JSON.parse(localStorage.getItem("usuarios")) || [];

// Formulário de cadastro
const formularioNovoUsuario = document.querySelector("#form-novo-usuario");

// Salva um novo usuário
if (formularioNovoUsuario) {

    formularioNovoUsuario.addEventListener("submit", function(event) {

        event.preventDefault();

        const novoUsuario = {
            nome: document.querySelector("#nome").value,
            email: document.querySelector("#email").value,
            telefone: document.querySelector("#telefone").value,
            funcao: document.querySelector("#funcao").value,
            status: document.querySelector("#status").value
        };

        usuariosHotel.push(novoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuariosHotel));

        alert("Usuário cadastrado com sucesso!");

        formularioNovoUsuario.reset();
    });
}

// Exibe os usuários na tabela
const tabelaUsuariosHotel = document.querySelector("#tabela-usuarios tbody");

if (tabelaUsuariosHotel) {

    tabelaUsuariosHotel.innerHTML = "";

    usuariosHotel.forEach(usuario => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.funcao}</td>
            <td>${usuario.status}</td>
            <td>-</td>
        `;

        tabelaUsuariosHotel.appendChild(linha);
    });
}
