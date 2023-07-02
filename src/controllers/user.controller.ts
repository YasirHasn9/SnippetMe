// I need the service for creating a user
import { Request, Response, NextFunction } from 'express';
import { UserServices } from '@src/services/user.service';
import Logger from '@src/utils/logger.utils';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = req.body;
    const user = await UserServices.create(userInput);
    res.status(201).send({ user });
  } catch (err: any) {
    Logger.error(`createUser ${err.message}`);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const findUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserServices.findAll();
    res.status(200).send({ users });
  } catch (err: any) {
    Logger.error(`findUsers ${err.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const UserController = {
  createUser,
  findUsers,
};
