const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Seat = sequelize.define('Seat', {
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'reserved'),
        defaultValue: 'available',
    },
});


module.exports = Seat;