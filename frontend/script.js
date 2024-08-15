const API_URL = 'http://localhost:3000';

// Load Equipment, Tasks, and Records
window.onload = () => {
    loadEquipment();
    loadTasks();
    loadRecords();
};

// Load Equipment List
function loadEquipment() {
    fetch(`${API_URL}/equipment`)
        .then(response => response.json())
        .then(data => {
            const equipmentList = document.getElementById('equipment-list');
            const taskEquipment = document.getElementById('task-equipment');
            equipmentList.innerHTML = '';
            taskEquipment.innerHTML = '';
            data.forEach(equipment => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = `equipment.html?id=${equipment.id}`;
                link.textContent = `${equipment.id}: ${equipment.name}`;
                li.appendChild(link);
                equipmentList.appendChild(li);

                const option = document.createElement('option');
                option.value = equipment.id;
                option.textContent = equipment.name;
                taskEquipment.appendChild(option);
            });
        });
}


// Add New Equipment
function addEquipment() {
    const name = document.getElementById('equipment-name').value;
    fetch(`${API_URL}/equipment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('equipment-name').value = '';
        loadEquipment();
    });
}

// Load Task List
function loadTasks() {
    fetch(`${API_URL}/tasks`)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `Task ID: ${task.id}, Equipment ID: ${task.equipment_id}, Description: ${task.description}, Status: ${task.status}`;
                if (task.status === 'Pending') {
                    const completeBtn = document.createElement('button');
                    completeBtn.textContent = 'Complete';
                    completeBtn.onclick = () => completeTask(task.id);
                    li.appendChild(completeBtn);
                }
                taskList.appendChild(li);
            });
        });
}

// Add New Task
function addTask() {
    const description = document.getElementById('task-desc').value;
    const equipment_id = document.getElementById('task-equipment').value;
    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, equipment_id })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('task-desc').value = '';
        loadTasks();
        loadRecords();
    });
}

// Complete Task
function completeTask(taskId) {
    fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
        loadRecords();
    });
}

// Load Records
function loadRecords() {
    fetch(`${API_URL}/records`)
        .then(response => response.json())
        .then(data => {
            const recordList = document.getElementById('record-list');
            recordList.innerHTML = '';
            data.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `Record ID: ${record.id}, Equipment ID: ${record.equipment_id}, Task ID: ${record.task_id}, Status: ${record.status}, Timestamp: ${record.timestamp}`;
                recordList.appendChild(li);
            });
        });
}
