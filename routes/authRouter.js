const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middleware/auth');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middleware/authRoles');
router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);

router.post('/forgot', authCtrl.forgotPassword);

router.post('/reset', auth, authCtrl.resetPassword);

router.post('/change_password', authCtrl.changePassword);

router.post('/logout', authCtrl.logout);

router.post('/refresh_token', authCtrl.generateAccessToken);

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), authCtrl.getAllUser);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), authCtrl.getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), authCtrl.updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), authCtrl.deleteUser);

module.exports = router;
