  // Função para pegar os dados do formulário e salvá-los no localStorage
  function handleSubmit(event) {
    event.preventDefault();
    
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let motor = document.getElementById('motor').value;
    let potencia_maxima = document.getElementById('potencia_maxima').value;
    let torque_maximo = document.getElementById('torque_maximo').value;
    let aceleracao = document.getElementById('aceleracao').value;
    let velocidade_max = document.getElementById('velocidade_max').value;
    let transmissao = document.getElementById('transmissao').value;

    const carObject = {
        marca,
        modelo,
        motor,
        potencia_maxima,
        torque_maximo,
        aceleracao,
        velocidade_max,
        transmissao
    };

    console.log(carObject);

// Salvar o objeto em um array de cars no localStorage
let cars = JSON.parse(localStorage.getItem("cars")) || [];
cars.push(carObject);
localStorage.setItem("cars", JSON.stringify(cars));


    // Limpar o formulário após enviar as informações
    limpaFormulario();

    // Adicionar a linha com os dados do carro na tabela
    adicionaLinhaTabela(carObject);
}

// Função para limpar o formulário após o envio das informações
function limpaFormulario() {
    document.querySelector("#carForm").reset();
}

// Função que adiciona as informações do carro na tabela
function adicionaLinhaTabela(car) {
    let tbody = document.querySelector("#cars-table > tbody"); 
    let linha = tbody.insertRow();    
    
    // Colunas restantes
    for (let prop in car) {
        let celula = linha.insertCell();    
        celula.textContent = car[prop];    
    }

    // Botão Editar
    let cellEditar = linha.insertCell();
    let btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-editar");
    btnEditar.innerHTML = "Editar";
    btnEditar.id = `btnEditar${car.modelo}`;
    cellEditar.appendChild(btnEditar);

    // Botão Remover
    let cellRemover = linha.insertCell();
    let btnRemover = document.createElement("button");  
    btnRemover.classList.add("btn-remover");
    btnRemover.innerHTML = "Remover";
    btnRemover.id = `btnRemover${car.modelo}`;
    btnRemover.addEventListener('click',()=> removeLinhaTabela(linha, car.marca));
    cellRemover.appendChild(btnRemover);    

    // Adicionar os listeners após adicionar os botões
    adicionaListeners();
}

// Remove uma determinada linha da tabela
function removeLinhaTabela(linha, marca) {
    if (confirm(`Deseja realmente excluir o ${marca}?`)) {
        // Remover a linha da tabela
        linha.remove();
        // Remover o item correspondente do localStorage
        let cars = JSON.parse(localStorage.getItem("cars")) || [];
        let index = cars.findIndex(item => item.marca === marca);
        if (index !== -1) {
            cars.splice(index, 1);
            localStorage.setItem("cars", JSON.stringify(cars));
        }
    }
}

// Função para carregar os carros na tabela ao carregar a página
function carregarCarros() {
    const tbody = document.querySelector("#cars-table > tbody");
    tbody.innerHTML = '';
    const cars = JSON.parse(localStorage.getItem('cars')) || [];

    // Adicionando carros à tabela
    cars.forEach(function(car) {
        adicionaLinhaTabela(car);
    });
}


// Função para adicionar os listeners dos botões de edição após a inicialização da tabela
function adicionaListeners() {
let editButtons = document.querySelectorAll(".btn-editar");
editButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
        let carModel = this.id.replace("btnEditar", "");
        let car = getCarByModel(carModel);
        if (car) {
            preencheFormulario(car); 
        } else {
            console.error("Carro não encontrado para edição.");
        }
    });
});
}


// Função para obter um carro com base no modelo
function getCarByModel(model) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    return cars.find(car => car.modelo === model);
}

// Função para preencher o formulário com os dados do carro selecionado para edição
function preencheFormulario(car) {
document.getElementById('marca').value = car.marca;
document.getElementById('modelo').value = car.modelo;
document.getElementById('motor').value = car.motor;
document.getElementById('potencia_maxima').value = car.potencia_maxima;
document.getElementById('torque_maximo').value = car.torque_maximo;
document.getElementById('aceleracao').value = car.aceleracao;
document.getElementById('velocidade_max').value = car.velocidade_max;
document.getElementById('transmissao').value = car.transmissao;

// Altera o botão de cadastrar para atualizar
const cadastrarBtn = document.getElementById('cadastrarBtn');
cadastrarBtn.innerText = 'Atualizar';
cadastrarBtn.dataset.index = car.modelo; 
cadastrarBtn.onclick = function(event) { atualizarCarro(event, car.modelo); }; 
}
// Array para armazenar os dados dos carros
let carData = [];

// Função para adicionar um carro à tabela
function adicionarCarro(marca, modelo, motor, potencia, torque, aceleracao, velocidade, transmissao) {
const tbody = document.querySelector("#cars-table > tbody");
const newRow = tbody.insertRow();
const cells = [
    marca,
    modelo,
    motor,
    potencia,
    torque,
    aceleracao,
    velocidade,
    transmissao
];

cells.forEach((data, index) => {
    const cell = newRow.insertCell(index);
    cell.textContent = data;
});

const editCell = newRow.insertCell();
const editButton = document.createElement("button");
editButton.classList.add("btn-editar");
editButton.innerText = "Editar";
editButton.addEventListener("click", function() {
    preencheFormulario(marca, modelo, motor, potencia, torque, aceleracao, velocidade, transmissao);
});
editCell.appendChild(editButton);

const removeCell = newRow.insertCell();
const removeButton = document.createElement("button");
removeButton.classList.add("btn-remover");
removeButton.innerText = "Remover";
removeButton.addEventListener("click", function() {
    if (confirm(`Deseja realmente excluir o ${modelo}?`)) {
        newRow.remove();
        // Atualiza o localStorage removendo o carro
        let cars = JSON.parse(localStorage.getItem("cars")) || [];
        cars = cars.filter(car => car.modelo !== modelo);
        localStorage.setItem("cars", JSON.stringify(cars));
    }
});
removeCell.appendChild(removeButton);
}

function adicionarCarrosIniciais() {
    // Verifica se já existem carros no localStorage
    if (!localStorage.getItem("cars")) {
        // Se não existirem, adiciona os dados iniciais
        const tbody = document.querySelector("#cars-table > tbody");
        dadosIniciais.forEach(carro => {
            carData.push(carro);
            adicionarCarro(carro.marca, carro.modelo, carro.motor, carro.potencia, carro.torque, carro.aceleracao, carro.velocidade, carro.transmissao);
        });
        // Salva os carros iniciais no localStorage
        localStorage.setItem("cars", JSON.stringify(dadosIniciais));
    }
}


// Dados iniciais dos carros
const dadosIniciais = [
    { marca: "Nissan", modelo: "Skyline R34", motor: "RB26DETT, Twin-turbo", potencia: "Cerca de 280 hp", torque: "Cerca de 392 Nm", aceleracao: "Aprox. 5 segundos", velocidade: "Cerca de 250 km/h", transmissao: "Manual de 6 velocidades" },
{ marca: "Audi", modelo: "R8", motor: "V10, aspirado", potencia: "Cerca de 562 hp", torque: "Cerca de 550 Nm", aceleracao: "Aprox. 3,5 segundos", velocidade: "Mais de 320 km/h", transmissao: "Automática de dupla embreagem, 7 velocidades" },
{ marca: "Toyota", modelo: "Supra MK4", motor: "2JZ-GTE, Twin-turbo", potencia: "Cerca de 320 hp", torque: "Cerca de 441 Nm", aceleracao: "Aprox. 4,6 segundos", velocidade: "Cerca de 250 km/h", transmissao: "Manual de 6 velocidades" },
{ marca: "Mitsubishi", modelo: "Lancer Evo", motor: "4 cilindros, turbo", potencia: "Cerca de 291 hp", torque: "Cerca de 407 Nm", aceleracao: "Aprox. 4,5 segundos", velocidade: "Cerca de 250 km/h", transmissao: "Manual de 5 ou 6 velocidades" },
{ marca: "Lamborghini", modelo: "Aventador", motor: "V12, aspirado", potencia: "Cerca de 730 hp", torque: "Cerca de 690 Nm", aceleracao: "Aprox. 2,9 segundos", velocidade: "Mais de 350 km/h", transmissao: "Automática de 7 velocidades" },
{ marca: "BMW", modelo: "M5", motor: "V8, Twin-turbo", potencia: "Cerca de 600 hp", torque: "Cerca de 750 Nm", aceleracao: "Aprox. 3,2 segundos", velocidade: "Cerca de 305 km/h", transmissao: "Automática de 8 velocidades" },
{ marca: "Rolls-Royce", modelo: "Cullinan", motor: "V12, Twin-turbo", potencia: "Cerca de 563 hp", torque: "Cerca de 850 Nm", aceleracao: "Aprox. 5 segundos", velocidade: "Cerca de 250 km/h", transmissao: "Automática de 8 velocidades" },
{ marca: "Ferrari", modelo: "458 Italia", motor: "V8, aspirado", potencia: "Cerca de 562 hp", torque: "Cerca de 540 Nm", aceleracao: "Aprox. 3,4 segundos", velocidade: "Mais de 320 km/h", transmissao: "Automática de dupla embreagem, 7 velocidades"},
{ marca: "Koenigsegg", modelo: "Agera RS", motor: "V8, Twin-turbo", potencia: "Mais de 1.000 hp", torque: "Mais de 1.000 Nm", aceleracao: "Aprox. 2,8 segundos", velocidade: "Mais de 420 km/h", transmissao: "Automática de 7 velocidades" },
{ marca: "Volkswagen", modelo: "Golf GTI", motor: "4 cilindros, turbo", potencia: "Cerca de 241 hp", torque: "Cerca de 350 Nm", aceleracao: "Aprox. 6 segundos", velocidade: "Cerca de 250 km/h", transmissao: "Manual ou Automática, 6 velocidades" }
];

// Adiciona os carros iniciais à tabela e ao localStorage
adicionarCarrosIniciais();

function atualizarCarro(event, modelo) {
    event.preventDefault();
    
    // Obtém os dados do formulário
    let marca = document.getElementById('marca').value;
    let motor = document.getElementById('motor').value;
    let potencia_maxima = document.getElementById('potencia_maxima').value;
    let torque_maximo = document.getElementById('torque_maximo').value;
    let aceleracao = document.getElementById('aceleracao').value;
    let velocidade_max = document.getElementById('velocidade_max').value;
    let transmissao = document.getElementById('transmissao').value;
    
    // Obtém os carros do localStorage
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    
    // Encontra o índice do carro a ser atualizado
    let index = cars.findIndex(car => car.modelo === modelo);
    
    // Atualiza os dados do carro no array de carros
    if (index !== -1) {
        cars[index] = {
            marca,
            modelo,
            motor,
            potencia_maxima,
            torque_maximo,
            aceleracao,
            velocidade_max,
            transmissao
        };

        // Atualiza o localStorage com o array atualizado
        localStorage.setItem("cars", JSON.stringify(cars));
        
        // Atualiza a tabela de carros
        carregarCarros();
        
        // Altera o botão para cadastrar novamente
        const cadastrarBtn = document.getElementById('cadastrarBtn');
        cadastrarBtn.innerText = 'Cadastrar';
        cadastrarBtn.dataset.index = ''; 
        cadastrarBtn.onclick = handleSubmit;

        // Limpa o formulário após atualizar a tabela
        limpaFormulario();
    } else {
        console.error("Carro não encontrado para atualização.");
    }
}





// Adiciona o evento de clique ao botão de cadastrar
document.getElementById('cadastrarBtn').onclick = handleSubmit;

// Chama a função carregarCarros ao carregar a página para exibir os carros na tabela
window.onload = carregarCarros;