import express from 'express'
import cors from 'cors'
import pino from 'pino-http'

import contactsRouter from './routers/contacts.js'
import { notFoundHandler } from './middlewares/notFoundHandle.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { getAllContacts, getContactById } from './controllers/contacts.js'

function setupServer() {
  const app = express()

  app.use(cors())
  app.use(pino())
  app.use('/contacts', contactsRouter)

  app.get('/contacts', getAllContacts)
  app.get('/contacts/:contactId', getContactById)

  app.use(notFoundHandler)
  app.use(errorHandler)

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  return app
}

export default setupServer
