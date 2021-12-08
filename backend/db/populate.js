import {} from 'dotenv/config.js';
import connectDB from './connect.js';
import User from '../models/user.model.js';
import Address from '../models/user.model.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import Review from '../models/review.model.js';
import { computer } from './products/computer.js';
import { electronic } from './products/electronic.js';
import { fashion } from './products/fashion.js';
import { mobile } from './products/mobile.js';
import { music } from './products/music.js';

const populateUsers = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        await User.deleteMany({});
        await Address.deleteMany({});

        // await User.create(data.users);
        console.log('Users data added to the database...');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const populateProducts = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        await Product.deleteMany({});
        await Review.deleteMany({});
        await Order.deleteMany({});

        await Product.create(computer);
        await Product.create(electronic);
        await Product.create(fashion);
        await Product.create(mobile);
        await Product.create(music);

        console.log('Products data added to the database...');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const start = () => {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case 'users':
            console.log('populating users...');
            return populateUsers();
        case 'products':
            console.log('Populating products...');
            return populateProducts();
        default:
            console.log('Please enter a valid data name to populate... (users, products)');
    }
};

start();
