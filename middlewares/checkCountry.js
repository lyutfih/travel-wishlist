const Country = require('../models/Country');

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
    const { alpha2Code, alpha3Code } = req.body;
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

module.exports = { checkCountry, checkCountryExists };