const { default: mongoose, mongo } = require("mongoose");
const generate = require("nanoid/generate");

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getCurrentTime = () => Date.now();

const generateRandomCode = () => generate(alphabet, 10);

const RoomSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: getCurrentTime,
    },
    roomCode: {
        type: String,
        required: true,
        unique: true,
        default: generateRandomCode,
    },
    host: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true,
    },
    guest: {
        type: [mongoose.SchemaType.ObjectId],
        ref: "Users",
    },
    currentVideo: {
        type: String,
        default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    guestControl: {
        type: Boolean,
        default: false,
    },
    privateRoom: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Rooms", RoomSchema);
