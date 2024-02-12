// JavaScript: script.js
function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to send to the backend
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Send the signup data to the backend
    fetch('http://127.0.0.1:5555/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Signup failed');
        }
    })
    .then(responseData => {
        // Handle the successful signup response
        document.getElementById('signupSuccess').style.display = 'block';
        setTimeout(() => {
            window.location.href = '/login'; // Redirect to login page
        }, 3000); // Redirect after 3 seconds
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error scenario
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('http://127.0.0.1:5555/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(userData => {
            if (userData && userData.token) {
                localStorage.setItem('token', userData.token);
                window.location.href = '/'; // Redirect to home page
            } else {
                throw new Error('User data is missing token');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginError.style.display = 'block'; // Show login error message
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Simulate logout process
    logout();

    // Redirect to the sign-in page after logout
    setTimeout(function() {
        window.location.href = '/sign-in';
    }, 2000); // Redirect after 2 seconds

    function logout() {
        // Perform logout actions here, if any
    }
});
