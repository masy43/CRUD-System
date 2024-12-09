let dataProduct = localStorage.Product ? JSON.parse(localStorage.Product) : [];
let searchMode = 'title';
let tempIndex = null; 

function calculateTotal() {
    const price = +document.getElementById('price1').value;
    const taxes = +document.getElementById('taxes').value;
    const ads = +document.getElementById('ads').value;
    const discount = +document.getElementById('discount').value;
    const total = price + taxes + ads - discount;

    const totalDisplay = document.getElementById('totalDisplay');
    if (!isNaN(total) && price) {
        totalDisplay.textContent = `Total: ${total}`;
        totalDisplay.style.backgroundColor = '#040';
        totalDisplay.style.color = 'white';
    } else {
        totalDisplay.textContent = '';
        totalDisplay.style.backgroundColor = 'darkgoldenrod';
        totalDisplay.style.color = '#111';
    }
}

document.getElementById('btn').onclick = function () {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price1').value,
        taxes: document.getElementById('taxes').value,
        ads: document.getElementById('ads').value,
        discount: document.getElementById('discount').value,
        total: document.getElementById('totalDisplay').textContent.split(' ')[1],
        count: document.getElementById('count').value,
        category: document.getElementById('category').value,
        notes: document.getElementById('notes').value,
    };

    if (product.title && product.price) {
        if (tempIndex !== null) {
            dataProduct[tempIndex] = product;
            tempIndex = null;
            this.value = 'Create'; 
        } else {
            
            dataProduct.push(product);
        }

        localStorage.setItem('Product', JSON.stringify(dataProduct));
        clearInputs();
        showProducts();
    }
};

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('price1').value = '';
    document.getElementById('taxes').value = '';
    document.getElementById('ads').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('totalDisplay').textContent = '';
    document.getElementById('count').value = '';
    document.getElementById('category').value = '';
    document.getElementById('notes').value = '';
}

function showProducts() {
    const tableBody = document.querySelector('.totable');
    tableBody.innerHTML = dataProduct.map((product, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.count}</td>
            <td>${product.category}</td>
            <td>${product.notes}</td>
            <td><button onclick="updateProduct(${index})">Update</button></td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>
    `).join('');
}

function updateProduct(index) {
    tempIndex = index;
    const product = dataProduct[index];

    
    document.getElementById('title').value = product.title;
    document.getElementById('price1').value = product.price;
    document.getElementById('taxes').value = product.taxes;
    document.getElementById('ads').value = product.ads;
    document.getElementById('discount').value = product.discount;
    document.getElementById('totalDisplay').textContent = `Total: ${product.total}`;
    document.getElementById('count').value = product.count;
    document.getElementById('category').value = product.category;
    document.getElementById('notes').value = product.notes;

    
    document.getElementById('btn').value = 'Update';
}

function deleteProduct(index) {
    dataProduct.splice(index, 1);
    localStorage.setItem('Product', JSON.stringify(dataProduct));
    showProducts();
}

function searchProduct() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredProducts = dataProduct.filter(product => product[searchMode].toLowerCase().includes(searchValue));
    document.querySelector('.totable').innerHTML = filteredProducts.map((product, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.count}</td>
            <td>${product.category}</td>
            <td>${product.notes}</td>
            <td><button onclick="updateProduct(${index})">Update</button></td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>
    `).join('');
}

function setSearchMode(mode) {
    searchMode = mode;
    document.getElementById('search').placeholder = `Search by ${mode}`;
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
}

showProducts();