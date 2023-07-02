import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInput } from '../../types';
import config from 'config';
import Logger from '@src/utils/logger.utils';

interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const usrSchema = new Schema<UserInput>(
  {
    name: { type: 'string', required: true },
    username: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    age: { type: 'number', required: true },
  },
  {
    minimize: false,
    // this will the createdAt and updatedAt properties
    timestamps: true,
  },
);

usrSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(config.get<number>('saltWorkFactor'));
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

// all our users instances have `comparedPasswords` method
usrSchema.methods.comparedPasswords = function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((err: any) => {
    Logger.error(err.message);
    return false;
  });
};
export const UserModel = model<UserInput>('User', usrSchema);
