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
       
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('jobTitle', jobTitle);
        formData.append('applicationDate', applicationDate);
        formData.append('status', status);
        formData.append('notes', notes);
        formData.append('resume', document.getElementById('resume').files[0]);
        formData.append('coverLetter', document.getElementById('coverLetter').files[0]);

        const response = await axios.post(`${apiUrl}/applications`, formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            alert('Application added successfully!');
            window.location.href = 'dashboard.html';
        } else {
            console.log('Here is the error:', response.data.message);
            alert('Failed to add application. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Error:', error);
    }
});
