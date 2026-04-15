const musicModel = require('../models/music.model');
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


    } catch (error) {
        return res.status(401).json({ message: 'Invalid token/Unauthorized' });
    }

    const { title } = req.body;

    const file = req.file;

    
}

module.exports = {
    createMusic,
};