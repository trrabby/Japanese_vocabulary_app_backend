import { LessonModel } from './lesson.model';

export const findLastLessonCode = async () => {
  const lastLesson = await LessonModel.findOne(
    {
      isDeleted: false,
    },
    {
      lesson_no: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastLesson?.lesson_no ? lastLesson.lesson_no : undefined;
};
