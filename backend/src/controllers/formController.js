import Form from '../models/Form.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const createForm = asyncHandler(async (req, res) => {
  const form = await Form.create(req.body);

  res.status(201).json({
    message: 'Form created successfully.',
    form,
  });
});

export const updateForm = asyncHandler(async (req, res) => {
  const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!form) {
    throw new ApiError(404, 'Form not found.');
  }

  res.json({
    message: 'Form updated successfully.',
    form,
  });
});

export const getFormById = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    throw new ApiError(404, 'Form not found.');
  }

  res.json(form);
});

export const listForms = asyncHandler(async (_req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json(forms);
});
