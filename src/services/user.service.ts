// I need to user model to create a user

import { Response, Request, NextFunction } from 'express';
import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';
import { UserInput } from '../../types';

const create = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    Logger.debugger(`created user: ${user}`);
    return user;
  } catch (err: any) {
    Logger.error(err.message);
  }
};

export const UserServices = { create };
