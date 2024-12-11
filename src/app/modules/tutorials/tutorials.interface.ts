import { Types } from 'mongoose';

export type Ttutorials = {
  tutorial_name: string;
  tutorial_category: string;
  tutorial_iFrame_url: string;
  email: string;
  created_by: Types.ObjectId;
  isDeleted: boolean;
};
