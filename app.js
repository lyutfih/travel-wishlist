const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const countriesRouter = require('./routes/countriesRoute');
app.use('/api/countries', countriesRouter);

const connectDB = require('./db/index');
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});