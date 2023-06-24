const router = require('express').Router();
const exerciseCtrl = require('../controllers/exerciseCtrl');
const auth = require('../middleware/auth');

router
  .route('/exercises')
  .post(auth, exerciseCtrl.createPost)
  .get(auth, exerciseCtrl.getPosts);

router
  .route('/exercise/:id')
  .patch(auth, exerciseCtrl.updatePost)
  .get(auth, exerciseCtrl.getPost)
  .delete(auth, exerciseCtrl.deletePost);

router.patch('/exercise/:id/like', auth, exerciseCtrl.likePost);

router.patch('/exercise/:id/unlike', auth, exerciseCtrl.unLikePost);

router.get('/user_posts/:id', auth, exerciseCtrl.getUserPosts);

router.get('/post_discover', auth, exerciseCtrl.getPostsDicover);

router.patch('/savePost/:id', auth, exerciseCtrl.savePost);

router.patch('/unSavePost/:id', auth, exerciseCtrl.unSavePost);

router.get('/getSavePosts', auth, exerciseCtrl.getSavePosts);

module.exports = router;
