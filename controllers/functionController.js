const Function = require('../models/Function');
const Movie = require('../models/Movie');
const Room = require('../models/Room');
const Seat = require('../models/Seat');

const getAllFunctions = async (req, res) => {
    try {
        const functions = await Function.findAll({
            include: [
                {
                    model: Movie,
                    attributes: ['id', 'title'],
                },
                {
                    model: Room,
                    attributes: ['id', 'name'],
                },
                {
                    model: Seat,
                    attributes: ['id', 'number', 'status'],
                },
            ],
        });
        if (!functions || functions.length === 0) {
            return res.status(404).json({ error: 'No functions found' });
        }
        res.status(200).json(functions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch functions', error });
    }
}

const getFunctionById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Function ID is required' });
        }
        const func = await Function.findByPk(id, {
            include: [
                {
                    model: Movie,
                    attributes: ['id', 'title'],
                },
                {
                    model: Room,
                    attributes: ['id', 'name'],
                },
                {
                    model: Seat,
                    attributes: ['id', 'number', 'status'],
                },
            ],
        });
        if (!func) {
            return res.status(404).json({ error: 'Function not found' });
        }
        res.status(200).json(func);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch function', error });
    }
}

const createFunction = async (req, res) => {
    const { date, time, movieId, roomId } = req.body;
    try {
        if (!date || !time || !movieId || !roomId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const room = await Room.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const alreadyExists = await Function.findOne({
            where: {
                date,
                time,
                roomId,
            },
        });

        if (alreadyExists) {   
            return res.status(409).json({ error: 'Function already exists' });
        }
        const newFunction = await Function.create({ date, time, movieId, roomId });

        const seats = [];
        for (let i = 1; i <= room.capacity; i++) {
            seats.push({ functionId:  newFunction.id, number: i, available: true });
        }
        await Seat.bulkCreate(seats);

        res.status(201).json(newFunction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create function', error });
    }
}

module.exports
= {
    getAllFunctions,
    getFunctionById,
    createFunction,
};
