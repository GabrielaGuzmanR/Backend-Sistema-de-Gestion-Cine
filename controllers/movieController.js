const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}

const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: 'Movie ID is required' });
        }
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
}

const createMovie = async (req, res) => {
    const { title, category, duration, classification } = req.body;
    try {
        if (!title || !category || !duration || !classification) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newMovie = await Movie.create({ title, category, duration, classification });
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create movie', error });
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
}
