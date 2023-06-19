const router = require('express').Router();
const tweetCtrl = require('../controllers/tweetCtrl');
const auth = require('../middleware/auth');

router.post('/tweet', auth, tweetCtrl.createTweet);

router.patch('/tweet/:id', auth, tweetCtrl.updateTweet);

router.delete('/tweet/:id', auth, tweetCtrl.deleteTweet);

module.exports = router;
