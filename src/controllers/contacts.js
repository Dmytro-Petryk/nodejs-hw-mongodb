const contactsService = require('../services/contacts')

async function getContacts(req, res, next) {
  try {
    const contacts = await contactsService.getAllContacts()
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}
async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params
    const contact = await contactsService.getContactById(contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContactByIdController,
}
