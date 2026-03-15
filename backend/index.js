const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/users',     require('./routes/users'))
app.use('/api/posts',     require('./routes/posts'))
app.use('/api/favorites', require('./routes/favorites'))

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

module.exports = app