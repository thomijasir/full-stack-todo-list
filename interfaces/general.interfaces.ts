import { Document } from 'mongoose';
export interface ITodo extends Document {
  username: string;
  title: string;
  done: boolean;
}
