const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    aritist:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    }
})

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;