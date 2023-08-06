// I need the service for creating a user
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserServices } from '@src/services/user.service';
import Logger from '@src/utils/logger.utils';

// When a user attempts to log in, you should hash the provided password and
// compare it to the stored hash value in the database.
// If they match, it means the password is correct without needing to decrypt anything.
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    const user = await UserServices.findByEmailOrUsername(email, username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Wrong password' });
    }

    return res.status(200).json({ message: 'User login successful' });
  } catch (err: any) {
    Logger.error(`Login failed: ${err.message}`);
    next(err);
    res.status(403).json({ err: err.message });
  }
};

const userRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = req.body;
    const user = await UserServices.create(userInput);
    res.status(201).send({ user });
  } catch (err: any) {
    Logger.error(`createUser ${err.message}`);
    next(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const findUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserServices.findAll();
    res.status(200).send({ users });
  } catch (err: any) {
    Logger.error(`findUsers ${err.message}`);
    next(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const user = await UserServices.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (err: any) {
    Logger.error(`findUserById ${err.message}`);
    next(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updatedUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const updatedUserInput = req.body;
    const updatedUser = await UserServices.updateUser(userId, updatedUserInput);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(201).json({ user: updatedUser });
  } catch (err) {
    Logger.error(`updatedUserById ${err}`);
    next(err);
    res.status(500).json({ error: err });
  }
};

const removeUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    await UserServices.deleteById(userId);
    return res.status(200).json({ msg: 'User Deleted' });
  } catch (err) {
    Logger.error(`deleteUserById ${err}`);
    next(err);
    return res.status(500).json({ error: err });
  }
};

export const UserController = {
  userLogin,
  userRegister,
  findUsers,
  findUserById,
  updatedUserById,
  removeUserById,
};
