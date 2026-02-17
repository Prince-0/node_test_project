const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const FILE = './slots.json';

function readSlots() {
    return JSON.parse(fs.readFileSync(FILE));
}

function writeSlots(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get('/slots', (req, res) => {
    const data = readSlots();
    const available = {};

    for (let time in data) {
        if (data[time].booked < data[time].capacity) {
            available[time] = data[time];
        }
    }

    res.json(available);
});

app.post('/book', (req, res) => {
    const { time } = req.body;
    const data = readSlots();

    if (!data[time]) {
        return res.status(400).json({ message: "Invalid time slot" });
    }

    if (data[time].booked < data[time].capacity) {
        data[time].booked++;
        writeSlots(data);
        return res.json({ message: "Booked" });
    }

    res.json({ message: "Slot Full" });
});

app.post('/cancel', (req, res) => {
    const { time } = req.body;
    const data = readSlots();

    if (data[time].booked > 0) {
        data[time].booked--;
        writeSlots(data);
        return res.json({ message: "Cancelled" });
    }

    res.json({ message: "Nothing to cancel" });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
