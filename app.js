const express = require('express');
const slotRoutes = require('./router/slotRouter');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api', slotRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});