import { Schema, model } from 'mongoose';
import { TLesson } from './lesson.interface';

const lessonSchema = new Schema<TLesson>(
  {
    lesson_name: {
      type: String,
      required: true,
      unique: true,
    },
    lesson_no: {
      type: String,
      required: true,
      default: 'Lesson_1',
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator id is required'],
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

export const LessonModel = model<TLesson>('Lesson', lessonSchema);
