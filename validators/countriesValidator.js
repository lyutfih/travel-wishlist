const { check, validationResult } = require('express-validator');

const countryDetailsValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('alpha2Code').isLength({ min: 2, max: 2 }).withMessage('alpha2Code must be 2 characters long'),
    check('alpha3Code').isLength({ min: 3, max: 3 }).withMessage('alpha3Code must be 3 characters long'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

module.exports = { countryDetailsValidator };