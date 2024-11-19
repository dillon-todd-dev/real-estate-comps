import mongoose from 'mongoose';
import { MONGO_URL } from '../constants/env';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Successfully connected to db');
  } catch (error) {
    console.log('Could not connect to the database', error);
    process.exit(1);
  }
};

export default connectToDatabase;