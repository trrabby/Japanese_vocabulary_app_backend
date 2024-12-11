import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { TutorialServices } from './tutorial.service';
import customizedMsg from '../../utils/customisedMsg';

const createTutorial: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await TutorialServices.createTutorialIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial is created successfully',
    data: result,
  });
});

const getAllTutorials: RequestHandler = catchAsync(async (req, res) => {
  const result = await TutorialServices.findAllTutorials();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result, 'Tutorials'),
    data: result,
  });
});

const getATutorial: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TutorialServices.getATutorial(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial has been retrieved successfully',
    data: result,
  });
});

const updateATutorial: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await TutorialServices.updateTutorial(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial Updated Successfully',
    data: result,
  });
});

const deleteAtutorial: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TutorialServices.deleteAtutorial(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial Deleted Successfully',
    data: result,
  });
});

export const TutorialControllers = {
  createTutorial,
  getAllTutorials,
  getATutorial,
  updateATutorial,
  deleteAtutorial,
};
