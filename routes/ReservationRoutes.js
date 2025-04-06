const express = require('express');
const router = express.Router();
const {
    getAllReservations,
    getReservationById,
    createReservation,
} = require('../controllers/reservationController');

router.get('/', getAllReservations); // GET /reservations
router.get('/:id', getReservationById); // GET /reservations/:id
router.post('/', createReservation); // POST /reservations

module.exports = router;

