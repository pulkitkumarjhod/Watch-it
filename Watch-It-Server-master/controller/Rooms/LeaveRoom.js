const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function LeaveRoom(req, res, next) {
    const {
        userId,
        body: { roomCode },
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

        if (!room) {
            res.status(400).json({ message: "Room not found" });
            return;
        }

        const user = await Users.findById(userId);

        if (room.host.toString() === userId) {
            await Rooms.deleteOne({ _id: room._id });

            user.hostOfRoom = user.hostOfRoom.filter(
                (item) => item._id.toString() === room._id.toString()
            );
            await user.save();

            res.json({ message: "Room deleted" });
        } else {
            room.guest = room.guest.filter(
                (user) => user.toString() !== userId
            );
            await room.save();

            user.guestOfRoom = user.guestOfRoom.filter(
                (item) => item._id.toString() === room._id.toString()
            );
            await user.save();

            res.json({ message: "User Removed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Crashed while leaving room" });
        return;
    }
    next();
    return;
}

module.exports = LeaveRoom;
