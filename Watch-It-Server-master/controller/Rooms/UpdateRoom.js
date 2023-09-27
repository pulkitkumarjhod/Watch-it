const Rooms = require("../../models/Rooms");

async function UpdateRoom(req, res, next) {
    const {
        userId,
        body: {
            roomCode,
            currentVideo = "",
            guestControl = false,
            privateRoom = false,
        },
    } = req;

    try {
        if (!roomCode || roomCode.length < 1) {
            res.status(400).json({ message: "Provide a valid room code" });
            return;
        }

        const room = await Rooms.findOne(
            { roomCode: roomCode },
            { createdAt: 0, __v: 0 }
        );

        if (!roomCode) {
            res.status(400).json({ message: "Room not found" });
            return;
        }

        room.currentVideo = currentVideo;
        room.guestControl = guestControl == "true";
        room.privateRoom = privateRoom == "true";

        await room.save();

        res.json({ message: "Room updated", room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Crashed while joining room" });
        return;
    }
    next();
    return;
}

module.exports = UpdateRoom;
