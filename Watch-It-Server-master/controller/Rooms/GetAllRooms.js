const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function GetAllRooms(req, res, next) {
    const publicRooms = await Rooms.find({ privateRoom: false }).select({
        roomCode: 1,
        currentVideo: 1,
        host: 1,
        _id: 0,
    });

    await Users.populate(publicRooms, { path: "host", select: "name -_id" });

    res.status(200).json({ result: publicRooms });
    next();
    return;
}

module.exports = GetAllRooms;
