// I need to user model to create a user

import { Response, Request, NextFunction } from 'express';
import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';
import { UserInput } from '../../types';

const create = async (input: UserInput) => {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    Logger.error(err);
  }
};

export const UserServices = { create };
