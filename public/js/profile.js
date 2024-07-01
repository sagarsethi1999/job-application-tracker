const apiUrl = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

const editProfile = () => {
    document.getElementById('username').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('careerGoals').disabled = false;
    
    document.getElementById('editProfileButton').style.display = 'none';
    document.getElementById('saveProfileButton').style.display = 'block';
};

const saveProfile = async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const careerGoals = document.getElementById('careerGoals').value;

    try {
        const response = await axios.put(`${apiUrl}/auth/profile`, {
            username,
            email,
            careerGoals
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            alert('Profile updated successfully!');
            fetchProfileDetails();
            // Optionally, disable form fields again after saving
            document.getElementById('username').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('careerGoals').disabled = true;
            document.getElementById('editProfileButton').style.display = 'block';
            document.getElementById('saveProfileButton').style.display = 'none';
        } else {
            alert('Failed to update profile. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while updating profile. Please try again.');
        console.error(error);
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};
const back = () => {
    window.location.href = 'dashboard.html';
};

document.getElementById('editProfileButton').addEventListener('click', editProfile);
document.getElementById('saveProfileButton').addEventListener('click', saveProfile);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('backButton').addEventListener('click', back);


const fetchProfileDetails = async () => {
    try {
        const response = await axios.get(`${apiUrl}/auth/profile`, {
            headers: { 'Authorization': token }
        });

        if (response.status === 200) {
            const { username, email, careerGoals } = response.data.user;
            document.getElementById('username').value = username;
            document.getElementById('email').value = email;
            document.getElementById('careerGoals').value = careerGoals;
        } else {
            alert('Failed to fetch profile details.');
        }
    } catch (error) {
        alert('An error occurred while fetching profile details.');
        console.error(error);
    }
};

fetchProfileDetails();
