/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errorHandlers/AppError';
import httpStatus from 'http-status';
import { UserServices } from '../users/user.service';
import { Ttutorials } from './tutorials.interface';
import { TutorialModel } from './tutorial.model';

const createTutorialIntoDB = async (payload: Ttutorials) => {
  try {
    // create a Lesson
    const { email } = payload;
    const findCreator = await UserServices.getAnUser(email);

    if (!email) {
      throw new Error('Please Insert an email.');
    } else {
      if (findCreator) {
        const creator = findCreator[0]._id;
        payload.created_by = creator;
      } else {
        throw new Error('You are unauthorized.');
      }
      //create a new vocabulary
      const newTutorial = await TutorialModel.create(payload);

      if (!newTutorial) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Lesson');
      }
      return newTutorial;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

const findAllTutorials = async () => {
  const result = await TutorialModel.aggregate([
    { $match: { isDeleted: false } }, // Filter documents where isDeleted is true
    { $sort: { _id: -1 } }, // Sort by _id in descending order
  ]);

  return result;
};

const getATutorial = async (id: string) => {
  const result = await TutorialModel.findOne({ _id: id }).populate({
    path: 'created_by',
    select: 'name email photoUrl',
  });
  return result;
};

const updateTutorial = async (id: string, payload: Partial<Ttutorials>) => {
  const result = await TutorialModel.findOneAndUpdate(
    { _id: id }, // Match the document where the email matches
    payload, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

const deleteAtutorial = async (id: string) => {
  const result = await TutorialModel.findOneAndUpdate(
    { _id: id }, // Match the document where the lesson_no matches
    { isDeleted: true }, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

export const TutorialServices = {
  createTutorialIntoDB,
  findAllTutorials,
  getATutorial,
  updateTutorial,
  deleteAtutorial,
};
