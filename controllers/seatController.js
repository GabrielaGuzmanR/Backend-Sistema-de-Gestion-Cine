const Seat = require('../models/Seat');
const Function = require('../models/Function');
const Room = require('../models/Room');


const createSeat = async (req, res) => {
    const { number, status, functionId } = req.body;
    try {
        if (!number || !status || !functionId) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const func = await Function.findByPk(functionId);
        if (!func) {
            return res.status(404).json({ error: 'Function not found' });
        }

        const newSeat = await Seat.create({ number, status, functionId });
        res.status(201).json(newSeat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create seat' });
    }
}


const setAvailable = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Seat ID is required' });
        }
        const seat = await Seat.findByPk(id);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }
        seat.status = 'available';
        await seat.save();
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to set seat as available' });
    }
}

const setReserved = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Seat ID is required' });
        }
        const seat = await Seat.findByPk(id);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }
        seat.status = 'reserved';
        await seat.save();
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to set seat as reserved' });
    }
}

module.exports = {
    createSeat,
    setAvailable,
    setReserved,
};

