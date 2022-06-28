const express = require('express')
const asyncHandler = require('express-async-handler')
const { User, Image } = require('../../db/models');

const imageValidations = require('../../validations/images')


const router = express.Router();


// get all images
router.get(
  '/',
  asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

// get single, target image
router.get(
  '/:id',
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    return res.json(image)
  })
);


// add image
router.post(
  '/', imageValidations.validateCreate,
  asyncHandler(async function (req, res, next) {
    try {
      const newImage = await Image.create(req.body);
      return res.json(newImage);
    } catch (err) {
      next(err);
    }
  })
);


// // edit image
router.put(
  '/:id/edit', imageValidations.validateUpdate,
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

// delete image
router.delete(
  '/:id',
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    await image.destroy();
    return res.json(req.body);
  })
)




module.exports = router;
