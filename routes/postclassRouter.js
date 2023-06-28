const router = require('express').Router();
const postclassCtrl = require('../controllers/postclassCtrl');
const auth = require('../middleware/auth');

router
  .route('/postclassrooms')
  .post(auth, postclassCtrl.createPost)
  .get(auth, postclassCtrl.getPosts);

router
  .route('/postclassroom/:id')
  .patch(auth, postclassCtrl.updatePost)
  .get(auth, postclassCtrl.getPost)
  .delete(auth, postclassCtrl.deletePost);

router.patch('/postclassroom/:id/like', auth, postclassCtrl.likePost);

router.patch('/postclassroom/:id/unlike', auth, postclassCtrl.unLikePost);

router.get('/user_postclassrooms/:id', auth, postclassCtrl.getUserPosts);

router.patch('/savePostClassroom/:id', auth, postclassCtrl.savePost);

router.patch('/unSavePostClassroom/:id', auth, postclassCtrl.unSavePost);

router.get('/getSavePostClassrooms', auth, postclassCtrl.getSavePosts);

module.exports = router;
