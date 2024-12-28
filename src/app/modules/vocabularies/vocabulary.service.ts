/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errorHandlers/AppError';
import httpStatus from 'http-status';
import { UserServices } from '../users/user.service';
import { VocabularyModel } from './vocabulary.model';
import { TVocabulary } from './vocabulary.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createVocabularyIntoDB = async (payload: TVocabulary) => {
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
      const newVocabulary = await VocabularyModel.create(payload);

      if (!newVocabulary) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Lesson');
      }
      return newVocabulary;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

const findAllVocabularies = async (query: Record<string, unknown>) => {
  const vocabularySearchableFields = [
    'word',
    'meaning',
    'pronunciation',
    'when_to_say',
  ];

  const vocabularyQuery = new QueryBuilder(VocabularyModel.find(), query)
    .search(vocabularySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await vocabularyQuery.countTotal();
  const result = await vocabularyQuery.modelQuery.find({ isDeleted: false });
  return { result, meta };
};

const getAVocabulary = async (id: string) => {
  const result = await VocabularyModel.findOne({ _id: id }).populate({
    path: 'created_by',
    select: 'name email photoUrl',
  });
  return result;
};

const getLessonwiseVocabulary = async (lesson_no: string) => {
  const result = await VocabularyModel.find({ lesson_no, isDeleted: false })
    .sort({ createdAt: 1 })
    .populate({
      path: 'created_by',
      select: 'name email photoUrl',
    });
  return result;
};

const updateVocabulary = async (id: string, payload: Partial<TVocabulary>) => {
  const result = await VocabularyModel.findOneAndUpdate(
    { _id: id }, // Match the document where the email matches
    payload, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

const deleteAVocabulary = async (id: string) => {
  const result = await VocabularyModel.findOneAndUpdate(
    { _id: id }, // Match the document where the lesson_no matches
    { isDeleted: true }, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

export const VocabularyServices = {
  createVocabularyIntoDB,
  findAllVocabularies,
  getAVocabulary,
  getLessonwiseVocabulary,
  updateVocabulary,
  deleteAVocabulary,
};
