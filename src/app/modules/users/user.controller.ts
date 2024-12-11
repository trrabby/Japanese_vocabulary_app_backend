import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';
import { RequestHandler } from 'express';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const AllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.findAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result, 'Users'),
    data: result,
  });
});

const getAnUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getAnUser(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been retrieved successfully',
    data: result,
  });
});

const updateAnUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.params;
  const payload = req.body;
  const result = await UserServices.updateAnUser(email, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  });
});

const deleteAnUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.deleteAnUser(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  AllUsers,
  getAnUser,
  updateAnUser,
  deleteAnUser,
};
