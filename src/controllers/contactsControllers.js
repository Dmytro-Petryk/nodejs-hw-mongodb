import Contact from '../models/contact.js'

export const getAllContacts = async (req, res) => {
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

  res.json({
    data,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  })
}
