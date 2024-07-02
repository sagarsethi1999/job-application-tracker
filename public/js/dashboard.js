document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:3000/api';

    const profileButton = document.getElementById('profileButton');
    const logApplicationButton = document.getElementById('logApplicationButton');
    const addCompanyButton = document.getElementById('addCompanyButton');
    const saveJobButton = document.getElementById('saveJobButton');
    const setReminderButton = document.getElementById('setReminderButton');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');

    profileButton.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    logApplicationButton.addEventListener('click', () => {
        window.location.href = 'application.html';
    });

    addCompanyButton.addEventListener('click', () => {
        window.location.href = 'company.html';
    });

    saveJobButton.addEventListener('click', () => {
        window.location.href = 'job.html';
    });

    setReminderButton.addEventListener('click', () => {
        window.location.href = 'reminder.html';
    });



    loadApplications();
    loadCompanies();
    loadJobs();
    loadReminders();

    searchInput.addEventListener('input', loadApplications);
    filterSelect.addEventListener('change', loadApplications);

    async function loadApplications() {
        try {
            const searchQuery = searchInput.value.trim().toLowerCase();
            const filterStatus = filterSelect.value;
            const response = await axios.get(`${apiUrl}/applications`, {
                headers: { 'Authorization': token }
            });
            let applications = response.data.applications.map(application => ({
                ...application,
                applicationDate: new Date(application.applicationDate).toISOString().split('T')[0]
            }));

            // Filter applications based on search query and filter status
            if (searchQuery) {
                applications = applications.filter(application =>
                    application.companyName.toLowerCase().includes(searchQuery) ||
                    application.jobTitle.toLowerCase().includes(searchQuery)
                );
            }
            if (filterStatus !== 'all') {
                applications = applications.filter(application => application.status === filterStatus);
            }

            displayData('applicationsSection', applications);
        } catch (error) {
            console.error('Error loading applications:', error);
        }
    }

    async function loadCompanies() {
        try {
            const response = await axios.get(`${apiUrl}/companies`, {
                headers: { 'Authorization': token }
            });
            console.log(response.data.companies);
            displayData('companiesSection', response.data.companies);
        } catch (error) {
            console.error('Error loading companies:', error);
        }
    }

    async function loadJobs() {
        try {
            const response = await axios.get(`${apiUrl}/jobs`, {
                headers: { 'Authorization': token }
            });
            displayData('jobsSection', response.data.jobs);
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    }

    async function loadReminders() {
        try {
            const response = await axios.get(`${apiUrl}/reminders`, {
                headers: { 'Authorization': token }
            });
            const reminders = response.data.reminders.map(reminder => {
                const modifiedreminder = {
                    ...reminder,
                    reminderDate: new Date(reminder.reminderDate).toISOString().split('T')[0]
                };
                return modifiedreminder;
            });
            
            displayData('remindersSection', reminders);
        } catch (error) {
            console.error('Error loading reminders:', error);
        }
    }


    function displayData(sectionId, data) {
        const section = document.getElementById(sectionId);
        if (data.length === 0) {
            section.innerHTML = '<p>No data available.</p>';
            return;
        }
        const table = document.createElement('table');
        const headers = Object.keys(data[0]);
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const headerRow = thead.insertRow();

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        data.forEach(item => {
            const row = tbody.insertRow();
            headers.forEach(header => {
                const cell = row.insertCell();
                if (header === 'status') {
                    const select = document.createElement('select');
                    const options = ['applied', 'interview', 'rejected', 'hired'];
                    options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option;
                        optionElement.textContent = option;
                        if (option === item[header]) {
                            optionElement.selected = true;
                        }
                        select.appendChild(optionElement);
                    });
                    select.addEventListener('change', async (event) => {
                        const newStatus = event.target.value;
                        try {
                            await axios.put(`${apiUrl}/applications/${item.applicationId}`, { status: newStatus }, {
                                headers: { 'Authorization': token }
                            });
                            item.status = newStatus; 
                        } catch (error) {
                            console.error('Error updating status:', error);
                        }
                    });
                    cell.appendChild(select);
                }
                 else if (header === 'resumeUrl' || header === 'coverLetterUrl') {
                    const link = document.createElement('a');
                    link.href = item[header];
                    link.target = '_blank';
                    link.textContent = 'View File';
                    cell.appendChild(link);
                } 
                else {
                    cell.textContent = item[header];
                }
            });
        });
        section.innerHTML = '';
        section.appendChild(table);
    }

    
});
