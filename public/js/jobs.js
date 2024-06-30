const apiUrl = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

document.getElementById('jobForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const companyId = document.getElementById('companyId').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const notes = document.getElementById('notes').value;

    try {
        const response = await axios.post(`${apiUrl}/jobs`, {
            companyId,
            jobTitle,
            jobDescription,
            notes
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Job added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Failed to add job. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});
