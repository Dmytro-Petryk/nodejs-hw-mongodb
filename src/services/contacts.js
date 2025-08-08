import Contact from '../models/Contact.js'
async function getAllContacts() {
  return await Contact.find()
}

async function getContactById(contactId) {
  return await Contact.findById(contactId)
}

export const createContact = (contactData) => Contact.create(contactData)

export const updateContact = (id, updates) =>
  Contact.findByIdAndUpdate(id, updates, { new: true })

export const deleteContact = (id) => Contact.findByIdAndDelete(id)

export { getAllContacts, getContactById }
