const apiUrl = 'http://localhost:3000/api';

// Register Form Event Listener
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const careerGoals = document.getElementById('careerGoals').value;

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                username,
                email,
                password,
                careerGoals
            });

            if (response.status === 201) {
                alert('Registration successful!');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error(error);
        }
    });
}

// Login Form Event Listener
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error(error);
        }
    });
}
