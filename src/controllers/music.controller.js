const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');
const { get } = require('mongoose');

async function createMusic(req, res) {

    const { title } = req.body;

    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({ message: 'Music created successfully', music }); 

}

async function createAlbum(req, res) {

    const { title, musics } = req.body;
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })
    res.status(201).json({ message: 'Album created successfully', album: { id: album._id, title: album.title, artist: album.artist, musics: album.musics } });

   
}

async function getAllMusics(req, res){
    // populate artist field with username and email from userModel
    const musics = await musicModel.find().skip(0).limit(20).populate('artist', 'username email');

    // limit and skip for pagination, for example, to get musics from 2nd page with 2 musics per page, we can do skip(2).limit(2)
    // const musics = await musicModel.find().skip(1).limit(2).populate('artist', 'username email');

    res.status(200).json({
        message: 'Musics fetched successfully',
        musics: musics,
    })
}

async function getAllAlbums(req, res){
    // populate artist field with username and email from userModel
    const albums = await albumModel.find().select('title artist').populate('artist', 'username email');

    res.status(200).json({
        message: 'Albums fetched successfully',
        albums: albums,
    })
}

async function getAlbumById(req, res){
    const { id } = req.params;

    const album = await albumModel.findById(id).populate('artist', 'username email').populate('musics');

    if(!album){
        return res.status(404).json({ message: 'Album not found' });
    }

    res.status(200).json({
        message: 'Album fetched successfully',
        album: album,
    })
}


module.exports = {
    createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById,
};