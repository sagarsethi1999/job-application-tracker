const apiUrl = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const applicationId = document.getElementById('applicationId').value;
    const content = document.getElementById('content').value;

    try {
        const response = await axios.post(`${apiUrl}/notes/${applicationId}/notes`, {
            content
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Note added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Failed to add note. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});

