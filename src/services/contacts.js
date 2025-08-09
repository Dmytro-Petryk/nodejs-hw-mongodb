import contact from '../models/contact.js'
async function getAllContacts() {
  return await contact.find()
}

async function getContactById(contactId) {
  return await contact.findById(contactId)
}

export const createContact = (contactData) => contact.create(contactData)

export const updateContact = (id, updates) =>
  contact.findByIdAndUpdate(id, updates, { new: true })

export const deleteContact = (id) => contact.findByIdAndDelete(id)

export { getAllContacts, getContactById }
