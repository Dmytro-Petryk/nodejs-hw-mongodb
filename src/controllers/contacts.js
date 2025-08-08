import createHttpError from 'http-errors'
import * as contactsServices from '../services/contacts.js'

export const getAllContacts = async (req, res) => {
  const data = await contactsServices.getAllContacts()
  res.json({ status: 200, message: 'Successfully found contacts!', data })
}

export const getContactById = async (req, res) => {
  const { contactId } = req.params
  const data = await contactsServices.getContactById(contactId)
  if (!data) {
    throw createHttpError(404, 'Contact not found')
  }
  res.json({ status: 200, message: 'Successfully found a contact!', data })
}

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Missing required fields')
  }
  const data = await contactsServices.createContact(req.body)
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  })
}

export const updateContact = async (req, res) => {
  const { contactId } = req.params
  const updated = await contactsServices.updateContact(contactId, req.body)
  if (!updated) {
    throw createHttpError(404, 'Contact not found')
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  })
}

export const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const deleted = await contactsServices.deleteContact(contactId)
  if (!deleted) {
    throw createHttpError(404, 'Contact not found')
  }
  res.status(204).send()
}
