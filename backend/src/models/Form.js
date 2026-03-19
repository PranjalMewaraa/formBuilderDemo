import mongoose from 'mongoose';

const conditionalSchema = new mongoose.Schema(
  {
    field: { type: String, trim: true },
    value: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const validationSchema = new mongoose.Schema(
  {
    pattern: { type: String, trim: true },
    minLength: Number,
    maxLength: Number,
    min: Number,
    max: Number,
    helperText: { type: String, trim: true },
    accept: [{ type: String, trim: true }],
    minSizeKb: Number,
    maxSizeKb: Number,
  },
  { _id: false }
);

const fieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['text', 'number', 'email', 'textarea', 'select', 'radio', 'checkbox', 'file'],
    },
    required: { type: Boolean, default: false },
    placeholder: { type: String, trim: true },
    options: [{ type: String, trim: true }],
    validation: validationSchema,
    matchWith: { type: String, trim: true },
    conditional: conditionalSchema,
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    fields: {
      type: [fieldSchema],
      default: [],
      validate: {
        validator(fields) {
          return Array.isArray(fields) && fields.length > 0;
        },
        message: 'Each section must include at least one field.',
      },
    },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sections: {
      type: [sectionSchema],
      default: [],
      validate: {
        validator(sections) {
          return Array.isArray(sections) && sections.length > 0;
        },
        message: 'A form must include at least one section.',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Form', formSchema);
