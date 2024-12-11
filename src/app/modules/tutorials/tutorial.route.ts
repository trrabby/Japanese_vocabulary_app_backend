import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { TutorialValidation } from './tutorial.validation';
import { TutorialControllers } from './tutorial.controller';

const router = express.Router();

router.post(
  '/create-tutorial',
  validateRequest(TutorialValidation.TutorialValidationSchema),
  TutorialControllers.createTutorial,
);

router.get('/', TutorialControllers.getAllTutorials);
router.get('/:id', TutorialControllers.getATutorial);

router.patch(
  '/:id',
  validateRequest(TutorialValidation.updateTutorialValidationSchema),
  TutorialControllers.updateATutorial,
);

router.delete('/:id', TutorialControllers.deleteAtutorial);

export const TutorialsRoutes = router;
