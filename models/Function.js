const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Movie = require('./Movie');
const Room = require('./Room');
const Seat = require('./Seat');

const Function = sequelize.define('Function', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    }
});

Function.belongsTo(Movie, { foreignKey: 'movieId' });
Function.belongsTo(Room, { foreignKey: 'roomId' });

Movie.hasMany(Function, { foreignKey: 'movieId' });
Room.hasMany(Function, { foreignKey: 'roomId' });

Function.hasMany(Seat, { foreignKey: 'functionId' });
Seat.belongsTo(Function, { foreignKey: 'functionId' });

module.exports = Function;