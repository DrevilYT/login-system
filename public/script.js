document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Simple client-side validation
    if (username === '' || password === '') {
        alert('Both fields are required.');
        return;
    }
    
    // Send login request to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Save username in a cookie
            document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 7}`;
            alert('Login successful');
            // Redirect or do something on successful login
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    
    // Simple client-side validation
    if (username === '' || password === '') {
        alert('Both fields are required.');
        return;
    }
    
    // Send registration request to server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful, you can now login.');
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Example of using the cookie (e.g., on page load)
window.onload = function() {
    const username = getCookie('username');
    if (username) {
        alert(`Welcome back, ${username}`);
        // Auto-fill the username or perform other actions
        document.getElementById('login-username').value = username;
    }
};
