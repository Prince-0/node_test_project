const { readSlots, writeSlots } = require('../utils/fileHandler');

exports.getAvailableSlots = (req, res) => {
    const data = readSlots();
    const available = {};

    for (let time in data) {
        if (data[time].booked < data[time].capacity) {
            available[time] = data[time];
        }
    }

    res.json(available);
};

exports.bookSlot = (req, res) => {
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
};

exports.cancelSlot = (req, res) => {
    const { time } = req.body;
    const data = readSlots();

    if (data[time].booked > 0) {
        data[time].booked--;
        writeSlots(data);
        return res.json({ message: "Cancelled" });
    }

    res.json({ message: "Nothing to cancel" });
};