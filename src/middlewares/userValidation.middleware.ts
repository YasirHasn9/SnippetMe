import { NextFunction, Request, Response } from 'express';
import { userValidationSchema } from '../../types';
import { UserServices } from '../services/user.service';
import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';
import { Types } from 'mongoose';

export const validateUserSchema = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    userValidationSchema.parse(userData);
  } catch (err: any) {
    Logger.error(`validateUserSchema ${err.message}`);
    return res.status(500).json({ error: err });
  }

  next();
};

export const validateDuplicate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    const isUserExistedByEmail = await UserModel.findOne().or([{ email }]);
    if (isUserExistedByEmail) {
      /* Without a return statement,the server will throw an error indicating the headers cannot be
      set due they are sent to client therefore cannot be modified
      */
      return res.status(409).json({ msg: `Email: ({email}) or is already exists` });
    }

    const isUserExistedByUsername = await UserModel.findOne().or([{ username }]);
    if (isUserExistedByUsername) {
      /* Without a return statement,the server will throw an error indicating the headers cannot be
      set due they are sent to client therefore cannot be modified
      */
      return res.status(409).json({ msg: `Username (${username}) or is already exists` });
    }
  } catch (err: any) {
    Logger.error(`validateDuplicate ${err.message}`);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  next();
};

export function isIdValid(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(403).json({ error: 'Invalid Id.' });
  }
  next();
}

export const isValidUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await UserServices.findById(userId);

    if (!user) {
      return res.status(404).json({ error: ' User not found.' });
    }
  } catch (err) {
    Logger.debugger(`middleware.isUser: ${err}`);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  next();
};
