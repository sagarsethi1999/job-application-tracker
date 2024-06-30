const apiUrl = 'http://localhost:3000/api';
const token = localStorage.getItem('token');



document.getElementById('companyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const contactDetails = document.getElementById('contactDetails').value;
    const companySize = document.getElementById('companySize').value;
    const industry = document.getElementById('industry').value;
    const notes = document.getElementById('notes').value;
    try {
        const response = await axios.post(`${apiUrl}/companies`, {
            name,
            contactDetails,
            companySize,
            industry,
            notes
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Company added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Failed to add company. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});
