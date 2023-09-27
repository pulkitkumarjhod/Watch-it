const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function JoinRoom(req, res, next) {
    const {
        userId,
        params: { roomCode = "" },
    } = req;

    try {
        if (roomCode.length < 1) {
            res.json({ status: false, message: "Please enter room code" });
        }

        const room = await Rooms.findOne(
            { roomCode: roomCode },
            { __v: 0, createdAt: 0 }
        );

        if (!room) {
            res.json({ status: false, message: "Room doesn't exists" });
            return;
        }

        if (room.host.toString() === userId) {
            res.json({
                message: "Already host of this room",
                status: true,
                result: room,
            });
        } else {
            room.guest.addToSet(userId);
            await room.save();

            const user = await Users.findById(userId);
            user.guestOfRoom.addToSet(room._id);
            await user.save();

            res.json({
                status: true,
                message: "Joined this room",
                result: room,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Crashed while joining room" });
        return;
    }
    next();
    return;
}

module.exports = JoinRoom;
