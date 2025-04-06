const Room = require('../models/Room');
const Movie = require('../models/Movie');
const Seat = require('../models/Seat');

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll({
        });
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ error: 'No rooms found' });
        }
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms', error });
    }
}

const getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Room ID is required' });
        }
        const room = await Room.findByPk(id, {
        });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch room' });
    }
}

const createRoom = async (req, res) => {
    const { name, capacity } = req.body;
    try {
        if (!name || !capacity) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newRoom = await Room.create({ name, capacity});
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
}

const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Room ID is required' });
        }
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        await room.destroy();
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete room' });
    }
}

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    deleteRoom,
}