const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fileService } = require('../services');

const createFile = catchAsync(async (req, res) => {
  const file = await fileService.createFile(req.body);
  res.status(httpStatus.CREATED).send(file);
});

const getFiles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fileName', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await fileService.queryFiles(filter, options);
  res.send(result);
});

const getFile = catchAsync(async (req, res) => {
  const file = await fileService.getFileById(req.params.fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  res.send(file);
});

const updateFile = catchAsync(async (req, res) => {
  const file = await fileService.updateFileById(req.params.fileId, req.body);
  res.send(file);
});

const deleteFile = catchAsync(async (req, res) => {
  await fileService.deleteFileById(req.params.fileId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
};
