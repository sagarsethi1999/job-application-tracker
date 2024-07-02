const apiUrl = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');

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

    registerButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});
