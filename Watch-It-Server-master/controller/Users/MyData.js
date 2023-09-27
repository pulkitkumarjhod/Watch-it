const Rooms = require("../../models/Rooms");
const Users = require("../../models/Users");

async function MyData(req, res, next) {
    const { userId } = req;

    try {
        const userData = await Users.findById(userId).select({
            name: 1,
            email: 1,
            hostOfRoom: 1,
            guestOfRoom: 1,
            _id: 0,
        });

        await Rooms.populate(userData, {
            path: "hostOfRoom guestOfRoom",
            select: { roomCode: 1, currentVideo: 1, host: 1, guest: 1, _id: 0 },
        });

        res.status(200).json({ result: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some internal error occured" });
        return;
    }

    next();
    return;
}

module.exports = MyData;
