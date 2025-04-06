const express = require('express');
const router = express.Router();
const {
    getAllFunctions,
    getFunctionById,
    createFunction,
} = require('../controllers/functionController');

router.get('/', getAllFunctions); // GET /functions
router.get('/:id', getFunctionById); // GET /functions/:id
router.post('/', createFunction); // POST /functions

module.exports = router;

