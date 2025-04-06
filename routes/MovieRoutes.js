const express = require('express');
const router = express.Router();
const {
    getAllMovies,
    getMovieById,
    createMovie,
} = require('../controllers/movieController');

router.get('/', getAllMovies); // GET /movies
router.get('/:id', getMovieById); // GET /movies/:id
router.post('/', createMovie); // POST /movies

module.exports = router;