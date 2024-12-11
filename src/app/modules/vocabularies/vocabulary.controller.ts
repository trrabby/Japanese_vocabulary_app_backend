import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { VocabularyServices } from './vocabulary.service';

const createVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  console.log(payload);

  const result = await VocabularyServices.createVocabularyIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary is created successfully',
    data: result,
  });
});

// const GetAllVocabularys: RequestHandler = catchAsync(async (req, res) => {
//   const result = await VocabularyServices.findAllVocabularys();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: customizedMsg(result, 'Vocabularys'),
//     data: result,
//   });
// });

// const getAVocabulary: RequestHandler = catchAsync(async (req, res) => {
//   const { Vocabulary_no } = req.params;
//   const result = await VocabularyServices.getAVocabulary(Vocabulary_no);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: customizedMsg(result, 'Vocabularys'),
//     data: result,
//   });
// });

// const updateAVocabulary: RequestHandler = catchAsync(async (req, res) => {
//   const { Vocabulary_no } = req.params;
//   const payload = req.body;
//   const result = await VocabularyServices.updateAVocabulary(lesson_no, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Lesson Updated Successfully',
//     data: result,
//   });
// });

// const deleteALesson: RequestHandler = catchAsync(async (req, res) => {
//   const { lesson_no } = req.params;
//   const result = await LessonServices.deleteALesson(lesson_no);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Lesson Deleted Successfully',
//     data: result,
//   });
// });

export const VocabularyControllers = { createVocabulary };
