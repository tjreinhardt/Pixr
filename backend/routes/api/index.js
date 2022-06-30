const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js');
const collectionsRouter = require('./collections');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/images', imagesRouter)

router.use('/collections', collectionsRouter)


module.exports = router;




// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// // test route 4
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/restore-user test route 3
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // test route 2
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));



// test route 1
// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });
// });
