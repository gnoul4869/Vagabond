import {} from 'dotenv/config.js';
import User from '../models/user.model.js';
import connectDB from './connect.js';
import data from './data.js';

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

populateUsers();
