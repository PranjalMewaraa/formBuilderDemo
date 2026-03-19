import { Router } from 'express';
import { createForm, getFormById, listForms, updateForm } from '../controllers/formController.js';

const router = Router();

router.get('/', listForms);
router.post('/', createForm);
router.get('/:id', getFormById);
router.put('/:id', updateForm);

export default router;
