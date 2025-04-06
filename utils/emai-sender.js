const {SESClient, SendEmailCommand} = require('@aws-sdk/client-ses');

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendReservationEmail = async (to, reservationId, date, seats, name ) => {
    const from  = "gguzmanr@unal.edu.co";

    const htmlBody = 
    `<html>
        <body>
            <h1>¡Reserva confirmada!</h1>
            <p>Hola ${name},</p>
            <p>Tu reserva ha sido confirmada con éxito.</p>
            <p>Detalles de la reserva:</p>
            <ul>
                <li>ID de reserva: ${reservationId}</li>
                <li>Fecha: ${date}</li>
                <li>Asientos: ${seats.join(', ')}</li>
            </ul>
            <p>¡Gracias por elegirnos!</p>
        </body>
    </html>`

    const params = {
        Source: from,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: 'Confirmacion de tu reserva',
                Charset: 'UTF-8',
            },
            Body: {
                Html: {
                    Data: htmlBody,
                    Charset: 'UTF-8',
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = {
    sendReservationEmail,
}