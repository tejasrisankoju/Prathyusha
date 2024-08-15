const API_URL = 'http://localhost:3000';

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const equipmentId = urlParams.get('id');
    if (equipmentId) {
        loadEquipmentDetails(equipmentId);
        loadTasksForEquipment(equipmentId);
        loadRecordsForEquipment(equipmentId);
    }
};

// Load Equipment Details
function loadEquipmentDetails(equipmentId) {
    fetch(`${API_URL}/equipment/${equipmentId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('equipment-title').textContent = `Equipment ID: ${data.id} - ${data.name}`;
            document.getElementById('equipment-info').textContent = `Details: ${data.details || 'No details available.'}`;
        });
}

// Load Tasks for the Equipment
function loadTasksForEquipment(equipmentId) {
    fetch(`${API_URL}/tasks`)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            const tasks = data.filter(task => task.equipment_id == equipmentId);
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `Task ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`;
                taskList.appendChild(li);
            });
            if (tasks.length === 0) {
                taskList.innerHTML = '<li>No tasks available for this equipment.</li>';
            }
        });
}

// Load Records for the Equipment
function loadRecordsForEquipment(equipmentId) {
    fetch(`${API_URL}/records`)
        .then(response => response.json())
        .then(data => {
            const recordList = document.getElementById('record-list');
            recordList.innerHTML = '';
            const records = data.filter(record => record.equipment_id == equipmentId);
            records.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `Record ID: ${record.id}, Task ID: ${record.task_id}, Status: ${record.status}, Timestamp: ${record.timestamp}`;
                recordList.appendChild(li);
            });
            if (records.length === 0) {
                recordList.innerHTML = '<li>No history records available for this equipment.</li>';
            }
        });
}
