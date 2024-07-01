const token = localStorage.getItem('token');
const apiUrl = 'http://localhost:3000/api';

document.getElementById('applicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const companyName = document.getElementById('companyName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const applicationDate = document.getElementById('applicationDate').value;
    const status = document.getElementById('status').value;
    const notes = document.getElementById('notes').value;

    try {
        const response = await axios.post(`${apiUrl}/applications`, {
            companyName,
            jobTitle,
            applicationDate,
            status,
            notes
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Application added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            console.log('here is the error');
            alert('Failed to add application. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});

