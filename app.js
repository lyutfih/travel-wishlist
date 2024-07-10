const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


const countriesRouter = require('./routes/countriesRoute');
app.use('/', countriesRouter);

const connectDB = require('./db/index');
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});