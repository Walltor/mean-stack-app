const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')   
const connectToDatabase = require('./config/database')
const { PORT } = require('./config/enviroment')
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const typeRoutes = require('./routes/typeRoutes')
const authRoutes = require('./routes/authRoutes')
const utilRoutes = require('./routes/utilityRoutes')

const app = express()

connectToDatabase()

app.use(bodyParser.json())
app.use(cors())

const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', userRoutes)
app.use('/', itemRoutes)
app.use('/', typeRoutes)
app.use('/', authRoutes)
app.use('/', utilRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
