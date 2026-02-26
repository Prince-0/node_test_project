const fs = require('fs');
const FILE = './slots.json';

function readSlots() {
    return JSON.parse(fs.readFileSync(FILE));
}

function writeSlots(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { readSlots, writeSlots };