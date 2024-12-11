/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errorHandlers/AppError';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  //set default user role

  payload.role = 'user';

  try {
    // create a user
    const newUser = await UserModel.create(payload);
    //create a student
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    return newUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

const findAllUsers = async () => {
  const result = await UserModel.aggregate([
    { $match: { isDeleted: false } }, // Filter documents where isDeleted is true
    { $sort: { _id: -1 } }, // Sort by _id in descending order
  ]);
  return result;
};

const getAnUser = async (email: string) => {
  const result = await UserModel.find({ email });
  return result;
};

const updateAnUser = async (email: string, payload: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate(
    { email }, // Match the document where the email matches
    payload, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

const deleteAnUser = async (email: string) => {
  const result = await UserModel.findOneAndUpdate(
    { email }, // Match the document where the email matches
    { isDeleted: true }, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  findAllUsers,
  getAnUser,
  updateAnUser,
  deleteAnUser,
};
