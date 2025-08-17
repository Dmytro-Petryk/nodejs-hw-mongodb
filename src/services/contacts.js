import contact from '../models/contact.js'

async function getAllContacts(query = {}) {
  let {
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = query

  page = Number(page) || 1
  perPage = Number(perPage) || 10
  const filter = {}
  if (type !== undefined) {
    filter.contactType = type
  }
  if (isFavourite !== undefined) {
    if (typeof isFavourite === 'string') {
      filter.isFavourite = isFavourite === 'true'
    } else {
      filter.isFavourite = !!isFavourite
    }
  }
  const skip = (page - 1) * perPage
  const totalItems = await contact.countDocuments(filter)
  const data = await contact
    .find(filter)
    .skip(skip)
    .limit(Number(perPage))
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
  const totalPages = Math.ceil(totalItems / perPage)
  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  }
}

async function getContactById(contactId) {
  return await contact.findById(contactId)
}

export const createContact = (contactData) => contact.create(contactData)

export const updateContact = (id, updates) =>
  contact.findByIdAndUpdate(id, updates, { new: true })

export const deleteContact = (id) => contact.findByIdAndDelete(id)

export { getAllContacts, getContactById }
