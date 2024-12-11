import { Types } from 'mongoose';

export type TVocabulary = {
  word: string;
  meaning: string;
  pronunciation: string;
  when_to_say: string;
  lesson_no: string;
  email: string;
  created_by: Types.ObjectId;
  isDeleted: boolean;
};
