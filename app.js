const express = require('express');
const response = require('./helpers/response');
const routes = require('./routes');
const cors = require('cors');
const app = express();


const port = process.env.POST || 5002;

// Handler Cors
app.use(cors());

// Serialize dan Deserialize Input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome API
app.get('/', async (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to my API',
    });
});

// Routes
routes(app);

// Error Handler
app.use(response.errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});