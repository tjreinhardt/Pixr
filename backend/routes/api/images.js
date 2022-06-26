const express = require('express')
const asyncHandler = require('express-async-handler')
const {Image} = require('./../../db/models')

// const imageValidations = require()

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function(req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

router.get(
  '/:id',
  asyncHandler(async function(req, res) {
    const image = await Image.findByPk(req.params.id);
    return res.json(image)
  })
)

module.exports = router;
