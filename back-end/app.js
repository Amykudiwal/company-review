const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const companyRoutes = require('./routes/companyRoute.js');
const reviewRoutes = require('./routes/reviewRoute.js');
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

mongoose.connect('mongodb://localhost:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/companies', companyRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
