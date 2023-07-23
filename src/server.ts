import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserController } from './controllers/user.controller';
import { validateUserSchema, validateDuplicate, idIsValid } from './middlewares/userValidation.middleware';
import Logger from 'src/utils/logger.utils';
import config from 'config';

import { userRoutes } from './routes/users.route';

export const startServer = (app: Application) => {
  /* Middlewares for information*/
  app.use((req: Request, res: Response, next: NextFunction) => {
    /*Log request*/
    Logger.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /* Log Response */
      Logger.log(
        `Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`,
      );
    });

    next();
  });

  /* House Keeping */
  // all requests from different domains
  app.use(cors());
  // parse application/json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Request (*) can come from any origin
    res.header('Access-Control-Allow-Origin', '*');
    // we can specify which headers are allowed to use
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      return res.status(200).json({});
    }

    next();
  });

  // TODO: Handle all the operations for uses in function
  // app.use('users', userCrud);
  // app.use('commun', accountCrud);

  /* Routes */
  /*Health Check*/
  app.get('/ping', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Pong', environment: config.get('env') });
  });

  app.use('/users', userRoutes);
  /* Error Handling */
  app.use((req: Request, res: Response) => {
    const error = new Error('Not Found');
    Logger.error(`Error Handling ${error.message}`);
    return res.status(404).json({ error: error.message });
  });
};
