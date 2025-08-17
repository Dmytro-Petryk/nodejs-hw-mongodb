import Contact from '../models/contact.js'

export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query
    const skip = (page - 1) * perPage

    const totalItems = await Contact.countDocuments()
    const contacts = await Contact.find().skip(skip).limit(Number(perPage))

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        hasPreviousPage: Number(page) > 1,
        hasNextPage: Number(page) < Math.ceil(totalItems / perPage),
      },
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}
