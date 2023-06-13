const router = require('express').Router();
const classroomCtrl = require('../controllers/classroomCtrl');
const auth = require('../middleware/auth');

router
  .route('/classrooms')
  .post(auth, classroomCtrl.createClassroom)
  .get(auth, classroomCtrl.getClassrooms);

router
  .route('/classroom/:id')
  .patch(auth, classroomCtrl.updateClassroom)
  .get(auth, classroomCtrl.getClassroom)
  .delete(auth, classroomCtrl.deleteClassroom);

// router.patch('/post/:id/like', auth, postCtrl.likePost)

// router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

// router.get('/user_posts/:id', auth, postCtrl.getUserPosts)

// router.get('/post_discover', auth, postCtrl.getPostsDicover)

// router.patch('/savePost/:id', auth, postCtrl.savePost)

// router.patch('/unSavePost/:id', auth, postCtrl.unSavePost)

// router.get('/getSavePosts', auth, postCtrl.getSavePosts)

module.exports = router;
