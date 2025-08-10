import * as contactsService from '../services/contacts.js'
import createHttpError from 'http-errors'

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts()
  res.json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: contacts,
  })
}

export const getContactById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactsService.getContactById(contactId)
  if (!contact) {
    throw createHttpError(404, 'Contact not found')
  }
  res.json({
    status: 200,
    message: 'Contact fetched successfully',
    data: contact,
  })
}

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Missing required fields')
  }
  const newContact = await contactsService.createContact(req.body)
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  })
}

export const updateContact = async (req, res) => {
  const { contactId } = req.params
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  )
  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found')
  }
  res.json({
    status: 200,
    message: 'Contact updated successfully!',
    data: updatedContact,
  })
}

export const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const deletedContact = await contactsService.deleteContact(contactId)
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found')
  }
  res.json({
    status: 200,
    message: 'Contact deleted successfully',
    data: deletedContact,
  })
}
