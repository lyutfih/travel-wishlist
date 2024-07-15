require('dotenv').config();
const axios = require('axios');
const Country = require('../models/Country');

const findCountry = async (req, res, next) => {
  try {
    const countryName = req.body.name;
    const country = await axios.get(`${process.env.API_URL}name/${countryName}`);

    const name = country.data[0].name.common;
    const { cca2,cca3 } = country.data[0];

    req.country = { name, alpha2Code: cca2, alpha3Code: cca3 };
    next();
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ error: 'Country not found' });
      }
  }
}
};

const checkCountry = async (req, res, next) => {
    const code = req.body.alpha2Code || req.body.alpha3Code || req.params.code;
    
    try {
      const country = await Country.findOne({ $or: [{ alpha2Code: code }, { alpha3Code: code }] });
      
      if (!country) {
        return res.status(404).json({ error: 'Country not found' });
      }
      
      req.country = country;
      next();
  
    } catch (error) {
      next(error);
    }
  };

const checkCountryExists = async (req, res, next) => {
    const { alpha2Code, alpha3Code } = req.country;
    try {
      const country = await Country.find({$or: [{alpha2Code}, {alpha3Code} ]});
        
        if (country.length > 0) {
            return res.status(400).json({ error: 'Country already exists' });
        }

        next();
     } catch (error) {
      next(error);
    }
  };

module.exports = { findCountry, checkCountry, checkCountryExists };