const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

// connect mongoose
mongoose
	.connect('mongodb://127.0.0.1:27017:27017/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database Connected Successfully!'.yellow.bold))
	.catch((err) => console.log(err));

// Add medialeware
app.use(cors());
app.use(express.json());

// get route
const RegisterRoute = require('./Routes/v1/Register.route');

app.get('/', (req, res) => {
	res.send(`<h1>How are you?</h1>`);
});

// call route
app.use('/api/v1/register', RegisterRoute);

app.use('*', (req, res) => {
	const { baseUrl } = req;

	res.send(`<h1>${baseUrl} Not Found!</h1>`);
});

app.listen(port, () => {
	console.log(`SSIB Bank Management Website Is Running: ${port}`.red.bold);
});
