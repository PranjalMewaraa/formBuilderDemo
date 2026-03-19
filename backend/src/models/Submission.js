import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
      index: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pdfPath: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Submission', submissionSchema);
