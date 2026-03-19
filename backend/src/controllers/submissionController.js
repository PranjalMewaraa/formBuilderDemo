import Form from '../models/Form.js';
import Submission from '../models/Submission.js';
import { generateApplicationNumber } from '../services/applicationNumberService.js';
import { generateSubmissionPdf } from '../services/pdfService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { validateSubmissionPayload } from '../utils/validation.js';

export const submitForm = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    throw new ApiError(404, 'Form not found.');
  }

  const normalizedPayload =
    typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data || req.body;

  const uploadedFiles = Object.fromEntries(
    Object.entries(req.files || {}).map(([fieldName, files]) => [fieldName, files[0]])
  );

  const validatedData = validateSubmissionPayload(form, normalizedPayload, uploadedFiles);

  let applicationNumber = generateApplicationNumber();
  while (await Submission.exists({ applicationNumber })) {
    applicationNumber = generateApplicationNumber();
  }

  const pdfPath = await generateSubmissionPdf({
    formTitle: form.title,
    applicationNumber,
    data: validatedData,
  });

  const submission = await Submission.create({
    formId: form._id,
    data: validatedData,
    applicationNumber,
    pdfPath,
  });

  res.status(201).json({
    message: 'Form submitted successfully.',
    submissionId: submission._id,
    applicationNumber,
    pdfPath,
  });
});
