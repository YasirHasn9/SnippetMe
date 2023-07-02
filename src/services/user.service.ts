import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';
import { UserInput } from '../../types';
import { omit } from 'lodash';

const create = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    Logger.error(err);
    // maybe user the throw new Error function
  }
};

const findAll = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err: any) {
    Logger.error(`findUsers : ${err}`);
  }
};

export const UserServices = { create, findAll };
