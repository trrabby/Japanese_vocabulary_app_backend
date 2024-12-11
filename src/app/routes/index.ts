import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { LessonRoutes } from '../modules/lessons/lesson.route';
import { VocabularyRoutes } from '../modules/vocabularies/vocabulary.route';
import { TutorialsRoutes } from '../modules/tutorials/tutorial.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/lessons',
    route: LessonRoutes,
  },
  {
    path: '/vocabularies',
    route: VocabularyRoutes,
  },
  {
    path: '/tutorials',
    route: TutorialsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
