import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { LessonServices } from './lesson.service';
import customizedMsg from '../../utils/customisedMsg';

const createLesson: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await LessonServices.createLessonIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson is created successfully',
    data: result,
  });
});

const GetAllLessons: RequestHandler = catchAsync(async (req, res) => {
  const result = await LessonServices.findAllLessons();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result, 'Lessons'),
    data: result,
  });
});

const getALesson: RequestHandler = catchAsync(async (req, res) => {
  const { lesson_no } = req.params;
  const result = await LessonServices.getALesson(lesson_no);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result, 'Lessons'),
    data: result,
  });
});

const updateALesson: RequestHandler = catchAsync(async (req, res) => {
  const { lesson_no } = req.params;
  const payload = req.body;
  const result = await LessonServices.updateALesson(lesson_no, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson Updated Successfully',
    data: result,
  });
});

const deleteALesson: RequestHandler = catchAsync(async (req, res) => {
  const { lesson_no } = req.params;
  const result = await LessonServices.deleteALesson(lesson_no);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson Deleted Successfully',
    data: result,
  });
});

export const LessonControllers = {
  createLesson,
  GetAllLessons,
  getALesson,
  updateALesson,
  deleteALesson,
};
