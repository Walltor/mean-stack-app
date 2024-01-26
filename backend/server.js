const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');   
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const typeRoutes = require('./routes/typeRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true });

const Item = require('./models/item.js');
const User = require('./models/user.js')
const Type = require('./models/type.js')

app.use(bodyParser.json());
app.use(cors());
app.use('/', itemRoutes);
app.use('/', typeRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
