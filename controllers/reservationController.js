const Reservation = require('../models/Reservation');
const Function = require('../models/Function');
const Movie = require('../models/Movie');
const Room = require('../models/Room');
const Seat = require('../models/Seat');

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                {
                    model: Function,
                    include: [
                        {
                            model: Movie,
                            attributes: ['id', 'title'],
                        },
                        {
                            model: Room,
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: Seat,
                    attributes: ['id', 'number', 'status'],
                }
            ],
        });
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found' });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations', details: error.message });
    }
}

const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Reservation ID is required' });
        }
        const reservation = await Reservation.findByPk(id, {
            include: [
                {
                    model: Function,
                    include: [
                        {
                            model: Movie,
                            attributes: ['id', 'title'],
                        },
                        {
                            model: Room,
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: Seat,
                    attributes: ['id', 'number', 'status'],
                }
            ],
        });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservation' });
    }
}

const createReservation = async (req, res) => {
    const { name, email, functionId, seats } = req.body;
    try {
        if (!name || !email || !seats || !functionId) {
            return res.status(400).json({ error: 'All parameters are obligatory' });
        }

        const foundSeats = await Seat.findAll({
            where: {
                id: seats,
                functionId: functionId,
                status: 'available',
            },
        });

        if (foundSeats.length !== seats.length) {
            return res.status(400).json({ error: 'Some seats are not available' });
        }

        const reservation = await Reservation.create({
            name,
            email,
            functionId,
        });

        await Promise.all(foundSeats.map(seat =>
            seat.update({
                status: 'reserved',
                reservationId: reservation.id
            })
        ));

        if (!reservation) {
            return res.status(500).json({ error: 'Failed to create reservation' });
        }

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation', details: error.message });
    }
}

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
};