// main.js

fetch('/admin/products')
    .then(res => res.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        for (let productId in data) {
            let li = document.createElement('li');
            li.textContent = `${data[productId].name} - $${data[productId].price}`;
            productList.appendChild(li);
        }
    });
