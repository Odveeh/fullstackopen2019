const http = require('http')
const app = require('./app.js')
const config = require('./utils/config.js')


const server = http.createServer(app);

const PORT = config.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})