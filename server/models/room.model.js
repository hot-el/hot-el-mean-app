const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true,
        default: 'basic'
    },
    size: {
        type: Number,
        required: true,
        default: 2
    },
    conservationDate: {
        type: Date
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Room', RoomSchema);