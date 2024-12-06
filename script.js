let cadastros = [];

// Função para cadastrar um aluno
function cadastrarAluno() {
    const nome = document.querySelector(".nome").value.trim();
    const matricula = document.querySelector(".matricula").value.trim();

    if (nome && matricula && matricula.length === 5) {
        // Verifica se a matrícula já foi cadastrada
        const existe = cadastros.some((cadastro) => cadastro.matricula === matricula);
        if (existe) {
            alert("Essa matrícula já foi cadastrada.");
            return;
        }

        // Adiciona o cadastro ao array
        cadastros.push({ nome, matricula });
        document.querySelector(".nome").value = "";
        document.querySelector(".matricula").value = "";

        renderizarCadastros();
    } else {
        alert("Preencha todos os campos corretamente. A matrícula deve ter 5 dígitos.");
    }
}

// Função para renderizar os cadastros
function renderizarCadastros() {
    const container = document.querySelector(".cadastrosContainer");
    container.innerHTML = ""; // Limpa os cadastros exibidos

    cadastros.forEach((cadastro, index) => {
        const div = document.createElement("div");
        div.classList.add("cadastrados");
        div.innerHTML = `
            <div class="informacoes">
                <h3>${cadastro.nome}</h3>
                <h4>${cadastro.matricula}</h4>
            </div>
            <div class="botoes">
                <button class="editar" onclick="editarCadastro(${index})">Editar</button>
                <button class="excluir" onclick="excluirCadastro(${index})">Excluir</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Função para pesquisar por nome
function pesquisarPorNome() {
    const nomePesquisa = document.querySelector(".pesquisaNome").value.trim();
    const resultados = cadastros.filter((cadastro) =>
        cadastro.nome.toLowerCase().includes(nomePesquisa.toLowerCase())
    );

    exibirResultados(resultados);
}

// Função para pesquisar por matrícula
function pesquisarPorMatricula() {
    const matriculaPesquisa = document.querySelector(".pesquisaMatricula").value.trim();
    const resultados = cadastros.filter(
        (cadastro) => cadastro.matricula === matriculaPesquisa
    );

    exibirResultados(resultados);
}

// Função para exibir os resultados da pesquisa
function exibirResultados(resultados) {
    const container = document.querySelector(".cadastrosContainer");
    container.innerHTML = ""; // Limpa os resultados anteriores

    if (resultados.length === 0) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    resultados.forEach((cadastro) => {
        const div = document.createElement("div");
        div.classList.add("cadastrados");
        div.innerHTML = `
            <div class="informacoes">
                <h3>${cadastro.nome}</h3>
                <h4>${cadastro.matricula}</h4>
            </div>
        `;
        container.appendChild(div);
    });
}

// Função para editar um cadastro
function editarCadastro(index) {
    const novoNome = prompt("Digite o novo nome:", cadastros[index].nome);
    const novaMatricula = prompt("Digite a nova matrícula:", cadastros[index].matricula);

    if (novoNome && novaMatricula && novaMatricula.length === 5) {
        // Verifica se a nova matrícula já existe (exceto para o cadastro atual)
        const existe = cadastros.some(
            (cadastro, i) => cadastro.matricula === novaMatricula && i !== index
        );
        if (existe) {
            alert("Essa matrícula já foi cadastrada por outro usuário.");
            return;
        }

        // Atualiza os dados do cadastro
        cadastros[index] = { nome: novoNome, matricula: novaMatricula };
        renderizarCadastros();
    } else {
        alert("Preencha os dados corretamente. A matrícula deve ter 5 dígitos.");
    }
}

// Função para excluir um cadastro
function excluirCadastro(index) {
    if (confirm("Tem certeza que deseja excluir este cadastro?")) {
        cadastros.splice(index, 1); // Remove o cadastro do array
        renderizarCadastros();
    }
}

// Adiciona os eventos aos botões
document.querySelector(".botaoCadastro").addEventListener("click", cadastrarAluno);
document.querySelector(".pesquinaNomeBotao").addEventListener("click", pesquisarPorNome);
document.querySelector(".pesquinaMatriculaBotao").addEventListener("click", pesquisarPorMatricula);