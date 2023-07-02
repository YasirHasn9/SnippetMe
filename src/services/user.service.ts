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
  }
};

export const UserServices = { create };
