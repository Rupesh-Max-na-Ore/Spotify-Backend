const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function createMusic(req, res) {



    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!(decoded.role == 'artist')){
            return res.status(403).json({message: 'You are not authorized to create music. Consider signing up as an artist.'});
        }

        const { title } = req.body;

        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        })

        res.status(201).json({ message: 'Music created successfully', music }); 


    } catch (error) {

        console.log(error);
        return res.status(401).json({ message: 'Invalid token/Unauthorized' });
    }


}

async function createAlbum(req, res) {

    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!(decoded.role == 'artist')){
            return res.status(403).json({message: 'You are not authorized to create album. Consider signing up as an artist.'});
        }

        const { title, musics } = req.body;
        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musics,
        })
        res.status(201).json({ message: 'Album created successfully', album: { id: album._id, title: album.title, artist: album.artist, musics: album.musics } });

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token/Unauthorized' });
    }
    
}

module.exports = {
    createMusic, createAlbum,
};