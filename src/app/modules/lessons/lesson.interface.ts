import { Types } from 'mongoose';

export type TLesson = {
  lesson_name: string;
  lesson_no: string;
  email: string;
  created_by: Types.ObjectId;
  isDeleted: boolean;
};
