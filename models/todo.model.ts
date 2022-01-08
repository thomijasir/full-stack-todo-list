import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../interfaces/general.interfaces';

const TodoSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    done: { type: String, required: true }
  },
  { timestamps: true, strict: true }
);

export default mongoose.model<ITodo>('Todo', TodoSchema);
