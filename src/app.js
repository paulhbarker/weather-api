require('dotenv').config();

const express = require('express');
const auth = require('./middleware/auth');

const getWeather = require('./routes/getWeather');
const createUser = require('./routes/createUser');
const login = require('./routes/login');
const getLocation = require('./routes/getLocation');

const app = express();

app.use(express.json());

app.get('/weather', auth, getWeather);
app.get('/location', auth, getLocation);
app.post('/user', createUser);
app.post('/login', login);

module.exports = app;
