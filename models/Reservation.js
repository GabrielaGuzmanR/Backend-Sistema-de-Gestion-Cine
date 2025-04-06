const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Seat = require('./Seat.js');
const Function = require('./Function.js');

const Reservation = sequelize.define('Reservation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Reservation.belongsTo(Function, {foreignKey: 'functionId'});
Function.hasMany(Reservation, {foreignKey: 'functionId'});

Reservation.hasMany(Seat, {foreignKey: 'reservationId'});

module.exports = Reservation;