import mongoose from 'mongoose';
import config from 'config';
import Logger from './logger.utils';

export const connect = async () => {
  const url = config.get<string>('mongo.url');
  try {
    await mongoose.connect(url, { retryWrites: true, w: 'majority' });
    Logger.success('Killer: you are connected to Database :)');
  } catch (error: any) {
    Logger.error(`Database connection error: ${error.message}}`);
    process.exit(1);
  }
};
