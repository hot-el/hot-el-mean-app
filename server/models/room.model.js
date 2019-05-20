const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Basic', 'Premium'],
        default: 'Basic'
    },
    size: {
        type: Number,
        required: true,
        default: 2
    },
    conservationDate: {
        type: Date
    },
    occupied: {
        type: Boolean,
        default: false
    },
    reserved: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    idCard: {
        type: String
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Room', RoomSchema);