const Country = require('../models/country');

const getAllCountries = async (req, res, next) => {
  try {
    const sort = req.query.sort === 'true' ? { name: 1 } : {};
    const countries = await Country.find().sort(sort);
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

const getCountryByCode = async (req, res, next) => {
    res.status(200).json(req.country);
};

const addCountry = async (req, res, next) => {
    try {
        const { name, alpha2Code, alpha3Code } = req.body;
        const country = new Country({ name, alpha2Code, alpha3Code });
        await country.save();
        res.status(201).json(country);
    } catch (error) {
        next(error);
    }
};

const updateCountry = async (req, res, next) => {
    try {
        const { name, alpha2Code, alpha3Code } = req.body;

        const country = req.country;
        country.name = name;
        country.alpha2Code = alpha2Code;
        country.alpha3Code = alpha3Code;
        
        const updateCountry = await country.save();
        res.status(200).json(updateCountry);
      } catch (error) {
        next(error);
      }
};

const deleteCountry = async (req, res, next) => {
    try {
      const country = req.country;
      
      await country.deleteOne();
  
      res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

module.exports = { getAllCountries, getCountryByCode, addCountry, updateCountry, deleteCountry};