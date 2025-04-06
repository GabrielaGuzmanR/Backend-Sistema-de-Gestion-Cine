const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Movie;