// what do you want to validate and how ?
/*
I got a request from the browser, which means I need to parse
extract the body from it, see if the client provides what the user ask for

the plan
create a middleware function that checks if the body contains the user's properties
 */

import { NextFunction, Request, Response } from 'express';
import { userValidationSchema } from '../../types';
import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';

export const validateUserSchema = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    userValidationSchema.parse(userData);
  } catch (err: any) {
    Logger.error(`validateUserSchema ${err.message}`);
    res.status(403).send(err.message);
  }

  next();
};

export const validateDuplicate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    const isUserExisted = await UserModel.findOne().or([{ username }, { email }]);
    if (isUserExisted) {
      res.status(409).json({ msg: `${username} or ${email} is already exists` });
    }
  } catch (err: any) {
    Logger.error(`validateDuplicate ${err.message}`);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  next();
};

/*
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

*/
