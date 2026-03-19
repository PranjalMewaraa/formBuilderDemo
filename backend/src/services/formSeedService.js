import Form from '../models/Form.js';
import { scribeRegistrationSchema } from '../utils/sampleFormSchema.js';

export async function seedDefaultForm() {
  const existing = await Form.findOne({ title: scribeRegistrationSchema.title });

  if (existing) {
    return existing;
  }

  return Form.create(scribeRegistrationSchema);
}
