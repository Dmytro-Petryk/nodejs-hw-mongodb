import express from 'express'
import Joi from 'joi'
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js'
import { validateBody } from '../middlewares/validateBody.js'
import { isValidId } from '../middlewares/isValidId.js'
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsSchemas.js'

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string()
    .valid('name', 'email', 'phone', 'status')
    .default('name'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
})

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    Object.assign(req.query, value)
    next()
  }
}

const router = express.Router()

router.get('/', validateQuery(querySchema), getAllContacts)

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
