const { initMongoConnection } = require('./db/initMongoConnection')
const setupServer = require('./server')

const start = async () => {
  await initMongoConnection()
  setupServer()
}

start()
