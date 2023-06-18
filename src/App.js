const express = require('express')
const app = express()
const port = 3000

const path = require('path');

const mongoose = require('mongoose');

// Import routes
const routes = require('./routes');

// Settings //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
const mongo_uri = 'YOUR MONGODB DATABASE URL'

mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });

// Link static files
app.use(express.static(path.join(__dirname, 'public'))) 

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(routes);

app.listen(port, () => console.log(`App listening on port ${port}!`))
