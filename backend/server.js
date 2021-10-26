import {} from 'dotenv/config.js'; //? To use environment variables from .env file
import express from 'express';

import 'express-async-errors'; //? Make Express catch errors coming from asynchronous functions without try-catch blocks
import expressLimiter from 'express-rate-limit'; //? Limit repeated requests to public APIs and/or endpoints such as password reset
import cors from 'cors'; //? Cross-origin resource sharing allows ajax requests to skip the same origin policy and access resources from remote hosts
import xss from 'xss-clean'; //? Filters input from users to prevent XSS attacks
import helmet from 'helmet'; //? Helps secure Express apps by setting various HTTP headers

import connectDB from './db/connect.js';
import authRouter from './routes/auth.route.js';
import productsRouter from './routes/products.route.js';
import auth from './middlewares/auth.middleware.js';
import notFound from './middlewares/not-found.middleware.js';
import errorHandler from './middlewares/error-handler.middleware.js';

const app = express();
const port = process.env.PORT || 5000;

//* Middlewares
app.set('trust proxy', 1); //! Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.use(
    expressLimiter({
        windowMs: 15 * 60 * 1000, //? 15 minutes
        max: 100, //? limit each IP to 100 requests per windowMs
    })
);
app.use(express.json()); //? Allows server to accept JSON in the body of a request
app.use(cors());
app.use(xss());
app.use(helmet());

//* Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', auth, productsRouter);

//* Error middlewares (Must be placed in the bottom)
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
