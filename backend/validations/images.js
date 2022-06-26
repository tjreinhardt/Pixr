const { check } = require('express-validator')
const { handleValidationErrors } = require('./../utils/validation')

const imageTitle = check('imageTitle')
  .notEmpty()
  .isLength({ max: 40 })
  .withMessage('Please provide a title under 40 characters long')
const imageUrl = check('imageUrl')
  .notEmpty()
  .isURL({ require_protocol: false, require_host: false })
  .withMessage('Please provide a valid link or URL address for your image URL')
const description = check('description')
  .isLength({ max: 140 })
  .withMessage('Description must be less than 140 characters in length')

exports.validateCreate = [
  imageTitle,
  imageUrl,
  description
];


exports.validateUpdate = [
  imageTitle,
  imageUrl,
  description,
  handleValidationErrors,
];
