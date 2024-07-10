const express = require('express');
const { countryDetailsValidator } = require('../validators/countriesValidator');
const { renderAllCountries, renderAddCountryForm, getCountryByCode, addCountry, updateCountry, deleteCountry } = require('../controllers/countriesController');
const { checkCountry,checkCountryExists } = require('../middlewares/checkCountry');

const countriesRouter = express.Router();

countriesRouter.get('/', renderAllCountries);

countriesRouter.get('/add/new', renderAddCountryForm);

countriesRouter.get('/api/countries/:code', checkCountry, getCountryByCode);

countriesRouter.post('/api/countries/', countryDetailsValidator, checkCountryExists, addCountry );

countriesRouter.put('/api/countries/', checkCountry, countryDetailsValidator, updateCountry);

countriesRouter.delete('/api/countries/:code', checkCountry, deleteCountry);

module.exports = countriesRouter;