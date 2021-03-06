const express = require('express');
const connectDB = require('./config/db')
const path = require('path')
require('dotenv').config()
const app = express();


//Connect DB

connectDB()

// Init middleware

app.use(express.json({
    extended: false
}))

// Define routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/stations', require('./routes/stations'))
app.use('/api/cars', require('./routes/cars'))
app.use('/api/reservations', require('./routes/reservations'))

// Serve static assets in production

if (process.env.NODE_ENV === 'production') {
    //Set static folder 

    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));