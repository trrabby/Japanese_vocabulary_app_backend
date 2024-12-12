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
    { $sort: { _id: 1 } }, // Sort by _id in descending order
  ]);

  return result;
};

const getALesson = async (lesson_no: string) => {
  const result = await LessonModel.aggregate([
    {
      $match: { lesson_no, isDeleted: false }, // Match the specific lesson
    },
    {
      $lookup: {
        from: 'vocabularies', // Vocabulary collection
        localField: 'lesson_no', // Field in lessons
        foreignField: 'lesson_no', // Field in vocabularies
        as: 'vocabulary', // Output array field
      },
    },
    {
      $lookup: {
        from: 'users', // Users collection
        localField: 'created_by', // Reference field in lessons
        foreignField: '_id', // Field in users
        as: 'created_by', // Output field
      },
    },
    {
      $unwind: {
        path: '$created_by', // Unwind the created_by array
        preserveNullAndEmptyArrays: true, // Keep null if no user is found
      },
    },
    {
      $addFields: {
        vocabulary: {
          $filter: {
            input: '$vocabulary',
            as: 'vocab',
            cond: { $eq: ['$$vocab.isDeleted', false] }, // Exclude deleted vocabulary
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        lesson_name: 1,
        lesson_no: 1,
        created_by: { name: 1, email: 1, photoUrl: 1 }, // Select specific fields from `created_by`
        vocabulary: 1, // Include filtered vocabulary
      },
    },
  ]);

  return result[0] || null; // Return the first document or null if not found
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
