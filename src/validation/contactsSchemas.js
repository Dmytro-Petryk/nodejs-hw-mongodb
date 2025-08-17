import Joi from 'joi'

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(20).required(),
  contactType: Joi.string().valid('personal', 'work').default('personal'),
  isFavourite: Joi.boolean().default(false),
})

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(20),
  contactType: Joi.string().valid('personal', 'work'),
  isFavourite: Joi.boolean(),
}).min(1)
