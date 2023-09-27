const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function CreateRoom(req, res, next) {
    const {
        userId,
        body: { guestControl = false, privateRoom = false, currentVideo = "" },
    } = req;

    if (!userId) {
        res.status(300).json({ message: "Params no fulfilled" });
        return;
    }

    const newRoom = await Rooms.create({
        host: userId,
        guestControl: guestControl,
        privateRoom: privateRoom,
        currentVideo: currentVideo,
    });

    const user = await Users.findById(userId);
    user.hostOfRoom.addToSet(newRoom._id);
    await user.save();

    res.status(201).json({
        message: "Room created",
        details: {
            roomId: newRoom._id,
            roomCode: newRoom.roomCode,
            hostId: newRoom.host,
            guestControl: newRoom.guestControl,
            privateRoom: newRoom.privateRoom,
            currentVideo: newRoom.currentVideo,
        },
    });

    next();
}

module.exports = CreateRoom;
