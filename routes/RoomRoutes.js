const express = require('express');
const router = express.Router();
const {
    getAllRooms,
    getRoomById,
    createRoom,
} = require('../controllers/roomController');

router.get('/', getAllRooms); // GET /rooms
router.get('/:id', getRoomById); // GET /rooms/:id
router.post('/', createRoom); // POST /rooms

module.exports = router;
