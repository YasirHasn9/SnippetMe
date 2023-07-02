// I need the service for creating a user
import { Request, Response, NextFunction } from 'express';
import { UserServices } from '@src/services/user.service';
import Logger from '@src/utils/logger.utils';

export const UserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = req.body;
    const user = await UserServices.create(userInput);

    res.status(201).send({ user });
  } catch (err: any) {
    Logger.error(err.message);
  }
};
