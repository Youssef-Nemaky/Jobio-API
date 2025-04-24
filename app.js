require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./db/connect');

//including the routers
const authRouter = require('./routes/auth');

//including error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// This allows the front-end to send a request to the back-end on the same localhost with different ports
app.use(
    cors({
        origin: 'http://localhost:3000', // this must match exactly
    })
);

app.use(express.json()); //To allow req.body in the request
// extra packages

// routes
app.get('/', (req, res) => {
    res.send('jobs api');
});
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

connectDB(process.env.MONGO_URI)
    .then(console.log('Connected to DB...'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
