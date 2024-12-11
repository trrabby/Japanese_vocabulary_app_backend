import { Schema, model } from 'mongoose';
import { Ttutorials } from './tutorials.interface';

const TutorialSchema = new Schema<Ttutorials>(
  {
    tutorial_name: {
      type: String,
      required: true,
      unique: true,
    },
    tutorial_category: {
      type: String,
      required: true,
    },
    tutorial_iFrame_url: {
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

export const TutorialModel = model<Ttutorials>('Tutorial', TutorialSchema);
