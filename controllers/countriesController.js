const Country = require('../models/Country');

const renderAllCountries = async (req, res, next) => {
  try {
    const success = req.query.success === 'true';
    const sort = req.query.sort === 'true' ? { name: 1 } : {};
    const countries = await Country.find().sort(sort);
    res.render('index', { countries, success });
  } catch (error) {
    next(error);
  }
};

const renderAddCountryForm = async (req, res, next) => {
  res.render('addCountry')
};

const getCountryByCode = async (req, res, next) => {
    res.status(200).json(req.country);
};

const addCountry = async (req, res, next) => {
    try {
        const { name, alpha2Code, alpha3Code } = req.country;
        const country = new Country({ name, alpha2Code, alpha3Code });
        await country.save();
        res.redirect('/?success=true');
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
      country.visited = !country.visited;
      await country.save();
  
      res.status(200).json({ message: `${country.name} is visited: ${country.visited}` });
    } catch (error) {
      next(error);
    }
  };

module.exports = { renderAllCountries, renderAddCountryForm, getCountryByCode, addCountry, updateCountry, deleteCountry };