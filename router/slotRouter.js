const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.get('/slots', slotController.getAvailableSlots);
router.post('/book', slotController.bookSlot);
router.post('/cancel', slotController.cancelSlot);

module.exports = router;