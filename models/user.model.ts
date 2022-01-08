import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interfaces';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, dropDups: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true, strict: true }
);

export default mongoose.model<IUser>('User', UserSchema);
