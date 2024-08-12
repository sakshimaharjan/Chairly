function showUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const content = document.getElementById('content');
            content.innerHTML = '<h2>Manage Users</h2>';
            content.innerHTML += '<div>' + users.map(user => `
                <p>${user.username} - ${user.email} 
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </p>
            `).join('') + '</div>';
        });
}

function showProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const content = document.getElementById('content');
            content.innerHTML = '<h2>Manage Products</h2>';
            content.innerHTML += '<div>' + products.map(product => `
                <p>${product.name} - $${product.price}
                    <button onclick="deleteProduct('${product._id}')">Delete</button>
                    <button onclick="editProduct('${product._id}')">Edit</button>
                </p>
            `).join('') + '</div>';
        });
}

function deleteUser(userId) {
    fetch('/api/user/' + userId, { method: 'DELETE' })
        .then(() => showUsers())
        .catch(error => console.error('Error:', error));
}

function deleteProduct(productId) {
    fetch('/api/products/' + productId, { method: 'DELETE' })
        .then(() => showProducts())
        .catch(error => console.error('Error:', error));
}

function editProduct(productId) {
    // This function would need additional implementation to handle product editing
}
