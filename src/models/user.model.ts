// build a user with the properties
// name, email, and password. --> yes makes it sample.
// schema is the shape of your data inside the db
import { Schema, model, Document } from 'mongoose';
import { UserInput } from '../../types';

interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const usrSchema = new Schema<UserInput>({
  name: { type: 'string', required: true },
  username: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true },
  age: { type: 'number', required: true },
});

export const UserModel = model<UserInput>('User', usrSchema);

/*
To create a relationship between a User/Parent and Child/Something, on Child model we have to add a reference to its Parent:

const ChildSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: “User/Parent” },
    ....
  },
);
*/
