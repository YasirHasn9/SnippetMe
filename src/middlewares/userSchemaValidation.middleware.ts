// what do you want to validate and how ?
/*
I got a request from the browser, which means I need to parse
extract the body from it, see if the client provides what the user ask for

the plan
create a middleware function that checks if the body contains the user's properties
 */

import { NextFunction, Request, Response } from 'express';
import { userValidationSchema } from '../../types';
import Logger from '@src/utils/logger.utils';

export const validateUserSchema = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    userValidationSchema.parse(userData);
    next();
  } catch (err: any) {
    Logger.error(err.message);
    res.status(403).send(err.message);
  }
};
