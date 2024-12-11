import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.get('/', UserControllers.AllUsers);

router.get('/:email', UserControllers.getAnUser);

router.patch(
  '/:email',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateAnUser,
);

router.delete('/:email', UserControllers.deleteAnUser);

export const UserRoutes = router;
