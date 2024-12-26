import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { LessonValidation } from './lesson.validation';
import { LessonControllers } from './lesson.controller';
import { VocabularyControllers } from '../vocabularies/vocabulary.controller';

const router = express.Router();

router.post(
  '/create-lesson',
  validateRequest(LessonValidation.LessonValidationSchema),
  LessonControllers.createLesson,
);

router.get('/', LessonControllers.GetAllLessons);

router.get('/:lesson_no', LessonControllers.getALesson);
router.get(
  '/lessonwise/:lesson_no',
  VocabularyControllers.GetLessonWiseVocabularies,
);

router.patch(
  '/:lesson_no',
  validateRequest(LessonValidation.updateLessonValidationSchema),
  LessonControllers.updateALesson,
);

router.delete('/:lesson_no', LessonControllers.deleteALesson);

export const LessonRoutes = router;
