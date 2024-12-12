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

router.get('/', VocabularyControllers.GetAllVocabularies);
router.get('/:id', VocabularyControllers.getAVocabulary);

router.patch(
  '/:id',
  validateRequest(VocabularyValidation.updateVocabularyValidationSchema),
  VocabularyControllers.updateAVocabulary,
);

router.delete('/:id', VocabularyControllers.deleteAVocabulary);

export const VocabularyRoutes = router;
