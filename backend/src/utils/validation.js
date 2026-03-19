import { ApiError } from './ApiError.js';

function isFieldVisible(field, data) {
  if (!field.conditional?.field) {
    return true;
  }

  return data[field.conditional.field] === field.conditional.value;
}

function isEmptyValue(value, type) {
  if (type === 'checkbox') {
    return value !== true;
  }

  return value === undefined || value === null || value === '';
}

function validatePattern(field, value, errors) {
  const pattern = field.validation?.pattern;

  if (!pattern || isEmptyValue(value, field.type)) {
    return;
  }

  const regex = new RegExp(pattern);
  if (!regex.test(String(value))) {
    errors[field.name] = `${field.label} format is invalid.`;
  }
}

function validateLength(field, value, errors) {
  if (isEmptyValue(value, field.type)) {
    return;
  }

  const stringValue = String(value);
  const { minLength, maxLength } = field.validation || {};

  if (minLength && stringValue.length < minLength) {
    errors[field.name] = `${field.label} must be at least ${minLength} characters.`;
  }

  if (maxLength && stringValue.length > maxLength) {
    errors[field.name] = `${field.label} must be at most ${maxLength} characters.`;
  }
}

function validateMatch(field, value, data, errors) {
  if (!field.matchWith || isEmptyValue(value, field.type)) {
    return;
  }

  if (String(value) !== String(data[field.matchWith] ?? '')) {
    errors[field.name] = `${field.label} must match ${field.matchWith}.`;
  }
}

function validateFile(field, value, errors) {
  if (!value) {
    return;
  }

  const allowedTypes = field.validation?.accept || [];
  const minSizeBytes = (field.validation?.minSizeKb || 0) * 1024;
  const maxSizeBytes = (field.validation?.maxSizeKb || 0) * 1024;

  if (allowedTypes.length > 0 && !allowedTypes.includes(value.mimetype)) {
    errors[field.name] = `${field.label} must be one of: ${allowedTypes.join(', ')}.`;
    return;
  }

  if (minSizeBytes && value.size < minSizeBytes) {
    errors[field.name] = `${field.label} must be at least ${field.validation.minSizeKb}KB.`;
    return;
  }

  if (maxSizeBytes && value.size > maxSizeBytes) {
    errors[field.name] = `${field.label} must be at most ${field.validation.maxSizeKb}KB.`;
  }
}

export function validateSubmissionPayload(form, payload, uploadedFiles = {}) {
  const errors = {};
  const filteredData = {};

  form.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const visible = isFieldVisible(field, payload);
      const fieldValue = field.type === 'file' ? uploadedFiles[field.name] : payload[field.name];

      if (!visible) {
        return;
      }

      if (field.required && isEmptyValue(fieldValue, field.type)) {
        errors[field.name] = `${field.label} is required.`;
        return;
      }

      if (field.type === 'file') {
        validateFile(field, fieldValue, errors);
        if (fieldValue) {
          filteredData[field.name] = {
            filename: fieldValue.filename,
            originalname: fieldValue.originalname,
            mimetype: fieldValue.mimetype,
            size: fieldValue.size,
            path: fieldValue.path,
          };
        }
        return;
      }

      validatePattern(field, fieldValue, errors);
      validateLength(field, fieldValue, errors);
      validateMatch(field, fieldValue, payload, errors);

      if (fieldValue !== undefined) {
        filteredData[field.name] = fieldValue;
      }
    });
  });

  if (Object.keys(errors).length > 0) {
    throw new ApiError(400, 'Validation failed for the submitted form.', errors);
  }

  return filteredData;
}
