const Rooms = require("../../models/Rooms");

async function DeleteAllRooms(req, res, next) {
    const { userId } = req;

    try {
        const result = await Rooms.deleteMany({ host: userId });
        if (result?.deletedCount > 0) {
            res.json({
                message: `All rooms deleted, total ${result?.deletedCount} rooms deleted`,
            });
        } else {
            res.json({ message: "No rooms by this user" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Crashed while deleting all rooms" });
        return;
    }
    next();
    return;
}

module.exports = DeleteAllRooms;
