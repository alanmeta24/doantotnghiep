const router = require('express').Router();
const classcommentCtrl = require('../controllers/classcommentCtrl');
const auth = require('../middleware/auth');

router.post('/classcomment', auth, classcommentCtrl.createComment);

router.patch('/classcomment/:id', auth, classcommentCtrl.updateComment);

router.patch('/classcomment/:id/like', auth, classcommentCtrl.likeComment);

router.patch('/classcomment/:id/unlike', auth, classcommentCtrl.unLikeComment);

router.delete('/classcomment/:id', auth, classcommentCtrl.deleteComment);

module.exports = router;
