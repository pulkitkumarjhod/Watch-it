const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "User",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    hostOfRoom: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Rooms",
    },
    guestOfRoom: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Rooms",
    },
});

module.exports = mongoose.model("Users", UserSchema);
