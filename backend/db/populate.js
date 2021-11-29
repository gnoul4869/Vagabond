import {} from 'dotenv/config.js';
import connectDB from './connect.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import data from './data.js';
import { products } from './products.js';

const populateUsers = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await User.deleteMany({});
        await User.create(data.users);
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
        await Product.create(products.fashion);
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
