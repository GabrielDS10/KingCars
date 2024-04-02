
// Função para adicionar um novo cliente à lista
function adicionarCliente(nome, endereco, telefone, email) {
    const listaClientes = document.getElementById('listaClientes');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${nome}</strong> <br>
        <small>${endereco}</small> <br>
        <small>${telefone}</small> <br>
        <small>${email}</small>
      </div>
      <div>
        <button type="button" class="btn btn-sm btn-primary editarBtn">Editar</button>
        <button type="button" class="btn btn-sm btn-danger excluirBtn">Excluir</button>
      </div>
    `;
    listaClientes.appendChild(li);
}

// Exemplo de uso da função adicionarCliente
adicionarCliente("João Silva", "Rua A, 123", "123456789", "joao@example.com");


function adicionarCliente(nome, endereco, telefone, email) {
    const listaClientes = document.getElementById('listaClientes');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${nome}</strong> <br>
        <small>${endereco}</small> <br>
        <small>${telefone}</small> <br>
        <small>${email}</small>
      </div>
      <div>
        <button type="button" class="btn btn-sm btn-primary editarBtn">Editar</button>
        <button type="button" class="btn btn-sm btn-danger excluirBtn">Excluir</button>
      </div>
    `;
    listaClientes.appendChild(li);
  }


  function preencherFormulario(nome, endereco, telefone, email, index) {
    document.getElementById('nome').value = nome;
    document.getElementById('endereco').value = endereco;
    document.getElementById('telefone').value = telefone;
    document.getElementById('email').value = email;
    document.getElementById('cadastrarBtn').innerText = 'Atualizar';
    document.getElementById('cadastrarBtn').dataset.index = index;
  }

  function atualizarCliente(index, nome, endereco, telefone, email) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes[index] = { nome, endereco, telefone, email };
    localStorage.setItem('clientes', JSON.stringify(clientes));
    carregarClientes();
  }

  function excluirCliente(index) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    carregarClientes();
  }

  function carregarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
     // Adicionando dados iniciais
     clientes.forEach(function(cliente) {
      adicionarCliente(cliente.nome, cliente.endereco, cliente.telefone, cliente.email);
    });
  } 

  // Dados iniciais
  const dadosIniciais = [
    { nome: "Pedro Knove", endereco: "Kracolandia 01", telefone: "41 190190190", email: "pedroknove@gnoia.com" },
    { nome: "Vini Maromba", endereco: "Fakenarylandia", telefone: "41 98765443", email: "vinimaromba@gsuco.com" },
    { nome: "Luiz Gabriel", endereco: "Tangamandapio", telefone: "41 996853593", email: "gabrields10@gmail.com" },
    { nome: "Douglas PresençaVip", endereco: "Vizinho do Knove", telefone: "41 157157157", email: "douglasdasvip@gvip.com" },
    { nome: "Borges Damassa", endereco: "Mangue 06", telefone: "41 121121121", email: "borgesmata@gmata.com" },
    { nome: "Gustavo tur", endereco: "Qualquer quadra", telefone: "41 99433", email: "gustavotur@gtur.com" }
  ];

  // Salvando dados iniciais no localStorage
  localStorage.setItem('clientes', JSON.stringify(dadosIniciais));

  

  document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    
    const cadastrarBtn = document.getElementById('cadastrarBtn');
    const index = cadastrarBtn.dataset.index;
    if (index) {
      atualizarCliente(index, nome, endereco, telefone, email);
    } else {
      adicionarCliente(nome, endereco, telefone, email);
      const cliente = { nome, endereco, telefone, email };
      const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
      clientes.push(cliente);
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }
    
    document.getElementById('clienteForm').reset();
    cadastrarBtn.innerText = 'Cadastrar';
    cadastrarBtn.removeAttribute('data-index');
  });

  document.getElementById('listaClientes').addEventListener('click', function(event) {
    if (event.target.classList.contains('editarBtn')) {
      const item = event.target.parentNode.parentNode;
      const index = Array.from(item.parentNode.children).indexOf(item);
      const nome = item.querySelector('strong').textContent;
      const endereco = item.querySelectorAll('small')[0].textContent;
      const telefone = item.querySelectorAll('small')[1].textContent;
      const email = item.querySelectorAll('small')[2].textContent;
      preencherFormulario(nome, endereco, telefone, email, index);
      item.remove();
    } else if (event.target.classList.contains('excluirBtn')) {
      const item = event.target.parentNode.parentNode;
      const index = Array.from(item.parentNode.children).indexOf(item);
      excluirCliente(index);
    }
  });



  window.onload = carregarClientes;