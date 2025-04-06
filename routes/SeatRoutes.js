const express = require('express');
const router = express.Router();
const {
    createSeat,
    setAvailable,
    setReserved,
} = require('../controllers/seatController');

router.post('/reserve/:id', setReserved); 
router.get('/unreserve/:id', setAvailable); // GET /seats/:id
router.post('/', createSeat); // POST /seats

module.exports = router;