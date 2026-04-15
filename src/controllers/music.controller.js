const musicModel = require('../models/music.model');
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

module.exports = {
    createMusic,
};