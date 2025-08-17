import express from 'express'
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsControllers.js'
import { validateBody } from '../middlewares/validateBody.js'
import { isValidId } from '../middlewares/isValidId.js'
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsSchemas.js'

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', isValidId, getContactById)

router.post('/', validateBody(createContactSchema), createContact)

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContact
)

router.delete('/:contactId', isValidId, deleteContact)

export default router
