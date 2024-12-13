import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be atleast 6 character long'],
    },

    photoUrl: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('User', userSchema);
