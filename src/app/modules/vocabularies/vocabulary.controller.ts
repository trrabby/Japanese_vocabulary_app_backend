import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { VocabularyServices } from './vocabulary.service';
import customizedMsg from '../../utils/customisedMsg';

const createVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await VocabularyServices.createVocabularyIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary is created successfully',
    data: result,
  });
});

const GetAllVocabularies: RequestHandler = catchAsync(async (req, res) => {
  const result = await VocabularyServices.findAllVocabularies(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabularies are retrieved successfully',
    data: result,
  });
});

const getAVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VocabularyServices.getAVocabulary(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary is retrieved successfully',
    data: result,
  });
});

const GetLessonWiseVocabularies: RequestHandler = catchAsync(
  async (req, res) => {
    const { lesson_no } = req.params;
    const result = await VocabularyServices.getLessonwiseVocabulary(lesson_no);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: customizedMsg(result, 'Vocabularies'),
      data: result,
    });
  },
);

const updateAVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await VocabularyServices.updateVocabulary(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary Updated Successfully',
    data: result,
  });
});

const deleteAVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VocabularyServices.deleteAVocabulary(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary Deleted Successfully',
    data: result,
  });
});

export const VocabularyControllers = {
  createVocabulary,
  GetAllVocabularies,
  getAVocabulary,
  GetLessonWiseVocabularies,
  updateAVocabulary,
  deleteAVocabulary,
};
