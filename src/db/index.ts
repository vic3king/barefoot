import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URL, TEST_MONGO_URI, NODE_ENV } = process.env;

const connect = async (): Promise<void> => {
    try {
        const uri = NODE_ENV === 'test' ? TEST_MONGO_URI : MONGODB_URL;
        await mongoose.connect(uri as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
        throw error;
    }
};

const close = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error while disconnecting from MongoDB:', error);
        throw error;
    }
};

export { connect, close };
