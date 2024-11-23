// login.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === 'Login successful') {
            window.location.href = '/'; // Redirect to home page
        }
    })
    .catch(error => console.error('Error:', error));
});
