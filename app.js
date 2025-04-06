const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const userRoutes = require('./routes/UserRoutes');
const movieRoutes = require('./routes/MovieRoutes');
const roomRoutes = require('./routes/RoomRoutes');
const reservationRoutes = require('./routes/ReservationRoutes');
const functionRoutes = require('./routes/FunctionRoutes');
const seatRoutes = require('./routes/SeatRoutes');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/functions', functionRoutes);
app.use('/seats', seatRoutes);


const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
    return sequelize.sync(); // Crea tablas si no existen
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err);
  });
