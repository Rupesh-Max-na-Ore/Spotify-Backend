const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'music',
    }],
    artist: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    }
})

const albumModel = mongoose.model('album', albumSchema);

module.exports = albumModel;