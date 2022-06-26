const express = require('express')
const asyncHandler = require('express-async-handler')
const { Image } = require('../../db/models');

const imageValidations = require('../../validations/images')

// const imageValidations = require()

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

router.get(
  '/:id',
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    return res.json(image)
  })
);


router.put(
  '/:id', imageValidations.validateUpdate,
  asyncHandler(async function (req, res, next) {
    try {
      const updatedImage = await Image.findByPk(req.params.id);
      await updatedImage.update(req.body);
      return res.json(updatedImage);
    } catch (err) {
      next(err);
    }
  })
);

router.delete(
  './:id',
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    await image.destroy();
    return res.json(req.body);
  })
)




module.exports = router;
