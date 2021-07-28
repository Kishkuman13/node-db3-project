const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const id = req.params.scheme_id;
  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        req.scheme = scheme;

        next();
      } else {
        res.status(404).json({ message: `scheme with scheme_id ${id} not found` })
      }
    })
    .catch(err => next(err))
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeData = req.body;

  if ( !schemeData || !schemeData.scheme_name ) {
    res.status(400).json({ message: 'invalid scheme_name'})
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const schemeData = req.body;

  if ( !schemeData || !schemeData.instructions || !schemeData.step_number === NaN || !schemeData.step_number < 1 ) {
    res.status(400).json({ message: 'invalid step'})
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
