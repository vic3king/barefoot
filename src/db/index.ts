import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../lib/logger';

dotenv.config();

const { MONGODB_URL, TEST_MONGO_URI, NODE_ENV } = process.env;

const connect = async (): Promise<void> => {
    try {
        const uri = NODE_ENV === 'test' ? TEST_MONGO_URI : MONGODB_URL;
        await mongoose.connect(uri as string);
        logger.log('info', 'Connected to MongoDB');
    } catch (error) {
        logger.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

const close = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.log('info', 'Connected to MongoDB');
    } catch (error) {
        logger.error('Error while disconnecting from MongoDB:', error);
        throw error;
    }
};

export { connect, close };
