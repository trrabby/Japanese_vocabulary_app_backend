import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { VocabularyValidation } from './vocabulary.validation';
import { VocabularyControllers } from './vocabulary.controller';

const router = express.Router();

router.post(
  '/create-vocabulary',
  validateRequest(VocabularyValidation.VocabularyValidationSchema),
  VocabularyControllers.createVocabulary,
);

// router.get('/', LessonControllers.GetAllLessons);
// router.get('/:lesson_no', LessonControllers.getALesson);

// router.patch(
//   '/:lesson_no',
//   validateRequest(LessonValidation.LessonValidationSchema),
//   LessonControllers.updateALesson,
// );

// router.delete('/:lesson_no', LessonControllers.deleteALesson);

export const VocabularyRoutes = router;
