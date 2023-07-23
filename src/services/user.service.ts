import { UserModel } from '@src/models/user.model';
import Logger from '@src/utils/logger.utils';
import { UserInput, User } from '../../types';
import { omit } from 'lodash';

const create = async (input: UserInput): Promise<User | null> => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    Logger.error(err);
    // maybe user the throw new Error function
    throw new Error(err);
  }
};

const findAll = async (): Promise<User[] | null> => {
  try {
    const users = await UserModel.find();
    const newUsers = users.map(user => omit(user.toJSON(), 'password'));
    return newUsers;
  } catch (err: any) {
    Logger.error(`findUsers : ${err}`);
    throw new Error(err);
  }
};

const findById = async (id: string): Promise<User | null> => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (err: any) {
    Logger.error(`findById : ${err}`);
    throw new Error(err);
  }
};

const updateUser = async (id: string, updatedUser: User): Promise<User | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    return omit(user?.toJSON(), 'password');
  } catch (err: any) {
    Logger.error(`updateUser : ${err}`);
    throw new Error(err);
  }
};

export const UserServices = { create, findAll, findById, updateUser };
