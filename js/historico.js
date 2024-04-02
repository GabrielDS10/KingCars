document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('carForm');
    const table = document.getElementById('carTable').getElementsByTagName('tbody')[0];
    let idCounter = 1; 

    // Carregar dados do Local Storage ao iniciar a página
    loadSalesDataFromLocalStorage();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carModel = document.getElementById('carModel').value;
        const carPrice = parseFloat(document.getElementById('carPrice').value);
        const carComprador = document.getElementById('carComprador').value;
        const carVendedor = document.getElementById('carVendedor').value;

        const saleTotal = calculateTotalSale(carPrice); // Calculando o valor total da venda

        // Adicionar os dados ao Local Storage
        const newSale = { id: idCounter, model: carModel, price: carPrice, comprador: carComprador, vendedor: carVendedor };
        addSaleToLocalStorage(newSale);

        // Adicionar os dados à tabela
        addCarToHistory(newSale);
        form.reset();
    });

    function calculateTotalSale(price) {
        // Suponha que haja um adicional de financiamento de 10% do preço do carro
        const financingFee = price * 0.1;

        // Suponha que há um pacote de extras que custa R$ 500,00
        const extrasCost = 500;

        // Suponha que haja uma taxa de documentação de R$ 200,00
        const documentationFee = 200;

        // Somando todos os custos adicionais ao preço do carro
        const totalSale = price + financingFee + extrasCost + documentationFee;

        return totalSale;
    }

    function addCarToHistory(saleData) {
        const row = table.insertRow();
        row.id = "car_" + saleData.id;
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);

        cell1.textContent = saleData.id;
        cell2.textContent = saleData.comprador;
        cell3.textContent = saleData.vendedor;
        cell4.textContent = saleData.model;
        cell5.textContent = saleData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        cell6.textContent = new Date().toLocaleDateString(); // Data da venda
        cell7.textContent = calculateTotalSale(saleData.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const editarList = document.createElement('button');
        editarList.textContent = 'Editar';
        editarList.style.cssText = 'background: #007bff; color: white; border: none; border-radius: 5px; padding: 5px; width: 60px; margin-bottom: 10px; cursor: pointer;';
        editarList.addEventListener('click', () => {
            const selectedField = prompt('Selecione o campo que deseja editar:', 'model');

            let novoValor;
            if (selectedField === 'model') {
                novoValor = prompt('Insira o novo modelo:', saleData.model);
                saleData.model = novoValor;
                cell2.textContent = novoValor;
            } else if (selectedField === 'price') {
                novoValor = parseFloat(prompt('Insira o novo preço:', saleData.price));
                saleData.price = novoValor;
                cell3.textContent = novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            } else if (selectedField === 'comprador') {
                novoValor = prompt('Insira o novo comprador:', saleData.comprador);
                saleData.comprador = novoValor;
                cell4.textContent = novoValor;
            } else if (selectedField === 'vendedor') {
                novoValor = prompt('Insira o novo vendedor:', saleData.vendedor);
                saleData.vendedor = novoValor;
                cell5.textContent = novoValor;
            } else {
                alert('Campo inválido!');
                return;
            }

            // Atualizar dados no Local Storage
            updateSaleInLocalStorage(saleData);
            alert('Registro editado com sucesso!');
        });
        
        const deletList = document.createElement('button');
        deletList.textContent = 'Deletar';
        deletList.style.cssText = 'background: red; color: white; border: none; border-radius: 5px; padding: 5px; width: 65px; margin-bottom: 10px; cursor: pointer;';
        
        deletList.addEventListener('click', () => {
            row.remove();
            // Remover a venda do Local Storage
            removeSaleFromLocalStorage(saleData.id);
            alert('Registro deletado com sucesso!');
        });

        cell8.appendChild(editarList);
        cell8.appendChild(deletList);
        
        idCounter++;
    }
 
    
    function addSaleToLocalStorage(saleData) {
        let sales = JSON.parse(localStorage.getItem('sales')) || [];
        sales.push(saleData);
        localStorage.setItem('sales', JSON.stringify(sales));
    }

    function loadSalesDataFromLocalStorage() {
        const sales = JSON.parse(localStorage.getItem('sales')) || [];
        sales.forEach((sale, index) => {
            addCarToHistory(sale);
        });
    }

    function updateSaleInLocalStorage(saleData) {
        const sales = JSON.parse(localStorage.getItem('sales')) || [];
        const updatedSales = sales.map(sale => {
            if (sale.id === saleData.id) {
                return saleData;
            }
            return sale;
        });
        localStorage.setItem('sales', JSON.stringify(updatedSales));
    }

    function removeSaleFromLocalStorage(saleId) {
        const sales = JSON.parse(localStorage.getItem('sales')) || [];
        const newSales = sales.filter(sale => sale.id !== saleId);
        localStorage.setItem('sales', JSON.stringify(newSales));
    }
});
