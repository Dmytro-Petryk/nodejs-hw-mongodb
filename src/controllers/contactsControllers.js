import Contact from '../models/contact.js'

export const getAllContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query

    const skip = (page - 1) * perPage
    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 }

    const [data, totalItems] = await Promise.all([
      Contact.find().sort(sortOptions).skip(skip).limit(Number(perPage)),
      Contact.countDocuments(),
    ])

    const totalPages = Math.ceil(totalItems / perPage)

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: Number(page) > 1,
        hasNextPage: Number(page) < totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
}

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body)
    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
}

export const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    )
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json(updatedContact)
  } catch (error) {
    next(error)
  }
}

export const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deletedContact = await Contact.findByIdAndDelete(contactId)
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    next(error)
  }
}
