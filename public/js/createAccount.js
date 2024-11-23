// createAccount.js
document.getElementById('createAccountForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === 'Account created successfully') {
            window.location.href = 'login.html'; // Redirect to login page
        }
    })
    .catch(error => console.error('Error:', error));
});
