const express = require('express');
const posteCtrl = require('../controllers/poste');
const auth = require('../midleware/auth')
const multer = require('../midleware/multer-config')

const router = express.Router();

router.post('/', auth, multer, posteCtrl.createPoste);
router.get('/:id', auth, posteCtrl.getOnePoste);
router.put('/:id', auth, multer, posteCtrl.modifyPoste);
router.delete('/:id', auth, posteCtrl.deletePoste);
router.get('/', auth, posteCtrl.getAllPostes);
router.post('/:id/like', auth, posteCtrl.likedNoLiked);

module.exports = router;