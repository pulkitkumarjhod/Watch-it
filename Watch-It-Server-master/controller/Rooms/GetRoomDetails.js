const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function GetRoomDetails(req, res, next) {
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

        await Rooms.populate(room, {
            path: "host guest",
            select: { name: 1, _id: 1 },
        });

        res.json({
            status: true,
            result: room,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Crashed while joining room",
            status: false,
        });
        return;
    }
    next();
    return;
}

module.exports = GetRoomDetails;
