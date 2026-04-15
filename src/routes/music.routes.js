const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic);

router.post('/album', authMiddleware.authArtist, musicController.createAlbum);

// for normal users and artists to view music
router.get('/', authMiddleware.authUser, musicController.getAllMusics);

// for users to get albums
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums);

router.get('/albums/:id', authMiddleware.authUser, musicController.getAlbumById);

module.exports = router;