import { Schema, model } from 'mongoose';
import { TVocabulary } from './vocabulary.interface';

const vocabularySchema = new Schema<TVocabulary>(
  {
    word: {
      type: String,
      required: true,
      unique: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    when_to_say: {
      type: String,
      required: true,
    },
    lesson_no: {
      type: String,
      required: true,
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

export const VocabularyModel = model<TVocabulary>(
  'Vocabulary',
  vocabularySchema,
);
