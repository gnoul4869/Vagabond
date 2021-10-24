import express from 'express';
import expressLimiter from 'express-rate-limit';
import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import productsRouter from './routes/products.route.js';

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
app.use(express.json()); //* Allows server to accept JSON in the body of a request
app.use(cors()); //* Cross-origin resource sharing allows ajax requests to skip the same origin policy and access resources from remote hosts
app.use(xss()); //* Filters input from users to prevent XSS attacks
app.use(helmet()); //* Helps secure Express apps by setting various HTTP headers

//* Routes
app.use('/api/v1/products', productsRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
