const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../midleware/auth')
const multer = require('../midleware/multer-config')

const router = express.Router();

router.post('/',auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/:id/like', auth, postCtrl.likedNoLiked);

module.exports = router;