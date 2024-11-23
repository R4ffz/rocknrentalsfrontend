function alugarInstrumento(nomeInstrumento, seletorDiasId) {
  const diasSelecionados = document.getElementById(seletorDiasId).value;
  const dataAluguel = new Date();
  const dataDevolucao = new Date(dataAluguel);
  dataDevolucao.setDate(dataAluguel.getDate() + parseInt(diasSelecionados));

  const meusAlugueis = document.getElementById('meusAlugueis');
  const itemAluguel = document.createElement('div');
  itemAluguel.className = 'col-md-4 mb-4 item-aluguel';
  itemAluguel.setAttribute('data-categoria', 'MeusAlugueis');
  itemAluguel.innerHTML = `
    <div class="card">
      <div class="card-body text-center">
        <h5 class="card-title">${nomeInstrumento}</h5>
        <p>Data de Devolução: ${dataDevolucao.toLocaleDateString()}</p>
        <p>Tempo Restante: <span class="tempo-restante" data-devolucao="${dataDevolucao}">${diasSelecionados} dias</span></p>
      </div>
    </div>
  `;
  meusAlugueis.appendChild(itemAluguel);

  setInterval(() => {
    const agora = new Date();
    const tempoRestanteElement = itemAluguel.querySelector('.tempo-restante');
    const dataDevolucao = new Date(tempoRestanteElement.getAttribute('data-devolucao'));
    const tempoRestante = Math.ceil((dataDevolucao - agora) / (1000 * 60 * 60 * 24));
    tempoRestanteElement.textContent = `${tempoRestante} dias`;
  }, 1000 * 60 * 60);
}

function filtrarCategoria(categoria) {
  const itens = document.querySelectorAll('.item-aluguel');
  itens.forEach(item => {
    if (categoria === 'Todos' || 
        item.getAttribute('data-categoria') === categoria || 
        item.getAttribute('data-categoria') === 'MeusAlugueis') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("cadastroNome").value.trim();
  const email = document.getElementById("cadastroEmail").value.trim();
  const senha = document.getElementById("cadastroSenha").value.trim();

  if (!nome || !email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioExistente = usuarios.find(user => user.email === email);

  if (usuarioExistente) {
    alert("Este email já está cadastrado.");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

function loginUsuario(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginPassword").value.trim();

  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

  if (usuarioValido) {
    alert(`Bem-vindo, ${usuarioValido.nome}!`);
    window.location.href = "aluguel.html";
  } else {
    alert("Email ou senha inválidos.");
  }
}
