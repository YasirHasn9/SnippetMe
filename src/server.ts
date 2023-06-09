import express, { Application, NextFunction, Request, Response } from 'express';
import Logger from 'src/utils/logger.utils';

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

  /* Routes */

  /*Health Check*/
  app.get('/what', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'up' });
  });

  /* Error Handling */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    Logger.error(error.message);
    return res.status(404).json({ error: error.message });
  });
};
