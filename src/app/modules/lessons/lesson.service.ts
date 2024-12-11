/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errorHandlers/AppError';
import httpStatus from 'http-status';
import { TLesson } from './lesson.interface';
import { findLastLessonCode } from './lesson.utils';
import { UserServices } from '../users/user.service';
import { LessonModel } from './lesson.model';

const createLessonIntoDB = async (payload: TLesson) => {
  try {
    // create a Lesson
    const { email } = payload;
    const lastLessonCode = await findLastLessonCode();
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

      if (lastLessonCode) {
        const newLessonArray = lastLessonCode?.split('_');
        const newLessonNumber = parseInt(newLessonArray[1]) + 1;
        const newLessonCode = `Lesson_${newLessonNumber}`;
        payload.lesson_no = newLessonCode;
      }
      //create a student
      const newLesson = await LessonModel.create(payload);
      if (!newLesson) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Lesson');
      }
      return newLesson;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

const findAllLessons = async () => {
  const result = await LessonModel.aggregate([
    { $match: { isDeleted: false } }, // Filter documents where isDeleted is true
    { $sort: { _id: -1 } }, // Sort by _id in descending order
  ]);

  return result;
};

const getALesson = async (lesson_no: string) => {
  const result = await LessonModel.find({ lesson_no }).populate({
    path: 'created_by',
    select: 'name email photoUrl',
  });
  return result;
};

const updateALesson = async (lesson_no: string, payload: Partial<TLesson>) => {
  const result = await LessonModel.findOneAndUpdate(
    { lesson_no }, // Match the document where the email matches
    payload, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

const deleteALesson = async (lesson_no: string) => {
  const result = await LessonModel.findOneAndUpdate(
    { lesson_no }, // Match the document where the lesson_no matches
    { isDeleted: true }, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

export const LessonServices = {
  createLessonIntoDB,
  findAllLessons,
  getALesson,
  updateALesson,
  deleteALesson,
};
