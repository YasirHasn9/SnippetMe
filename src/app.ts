import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import { connect } from '@src/utils/connect.utils';
import config from 'config';
import Logger from '@src/utils/logger.utils';

const app: Express = express();
const port = config.get<number>('server.port');

app.listen(port, () => {
  Logger.log(`Server started on port ${port}`);
  connect();
});
