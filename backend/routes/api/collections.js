const express = require('express');
const asyncHandler = require('express-async-handler');
const { Collection } = require('../../db/models')
const router = express.Router()

router.get(
  '/users/:userId',
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const collections = await Collection.findAll({
      where: { userId }
    });
    res.json(collections)
  })
)
router.get(
  '/',
  asyncHandler(async function (req, res) {
    const collections = await Collection.findAll();
    return res.json(collections);
  })
);

// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const { collectionId } = req.params;
//     const collection = await Collection.findByPk(collectionId)
//     return res.json(collection)
//   })
// )

router.get(
  '/:id',
  asyncHandler(async function (req, res) {
    const collection = await Collection.findByPk(req.params.id);
    return res.json(collection)
  })
);


router.post(
  `/`,
  asyncHandler(async (req, res) => {
    const collection = await Collection.create(req.body);
    res.json(collection)
  })
)


router.delete(
  `/:id`,
  asyncHandler(async function (req, res) {
    const collection = await Collection.findByPk(req.params.id);
    // console.log('collection', collection, typeof collection)
    await collection.destroy()
    return res.json(collection)
  })
)

module.exports = router
