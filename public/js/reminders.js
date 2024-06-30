const apiUrl = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

document.getElementById('reminderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const applicationId = document.getElementById('applicationId').value;
    const reminderDate = document.getElementById('reminderDate').value;

    try {
        const response = await axios.post(`${apiUrl}/reminders`, {
            applicationId,
            reminderDate
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Reminder added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Failed to add reminder. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});
