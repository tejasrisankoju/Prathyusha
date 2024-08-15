const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for simplicity
let equipment = [];
let tasks = [];
let records = [];

// Equipment Routes
app.get('/equipment', (req, res) => {
    res.json(equipment);
});

app.post('/equipment', (req, res) => {
    const newEquipment = { id: equipment.length + 1, ...req.body };
    equipment.push(newEquipment);
    res.status(201).json(newEquipment);
});

app.get('/equipment/:id', (req, res) => {
    const equipmentId = parseInt(req.params.id, 10);
    const equipmentItem = equipment.find(e => e.id === equipmentId);
    if (equipmentItem) {
        res.json(equipmentItem);
    } else {
        res.status(404).json({ message: 'Equipment not found' });
    }
});

// Task Routes
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, status: 'Pending', ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'Completed';
        const newRecord = { id: records.length + 1, equipment_id: task.equipment_id, task_id: taskId, timestamp: new Date(), status: 'Completed' };
        records.push(newRecord);
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Record Routes
app.get('/records', (req, res) => {
    res.json(records);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
