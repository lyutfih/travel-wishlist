const express = require('express');
const { countryDetailsValidator } = require('../validators/countriesValidator');
const { getAllCountries, getCountryByCode, addCountry, updateCountry, deleteCountry } = require('../controllers/countriesController');
const { checkCountry,checkCountryExists } = require('../middlewares/checkCountry');

const countriesRouter = express.Router();

countriesRouter.get('/', getAllCountries);

countriesRouter.get('/:code', checkCountry, getCountryByCode);

countriesRouter.post('/', countryDetailsValidator, checkCountryExists, addCountry );

countriesRouter.put('/', checkCountry, countryDetailsValidator, updateCountry);

countriesRouter.delete('/:code', checkCountry, deleteCountry);

module.exports = countriesRouter;