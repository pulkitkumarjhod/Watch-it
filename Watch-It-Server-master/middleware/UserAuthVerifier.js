const Users = require("../models/Users");

async function UserAuthVerifier(req, res, next) {
    try {
        if (!req?.headers?.authorization) {
            // res.status(400).json({ message: "Need auth token to access" });
            return;
        }

        const userId = String(req?.headers?.authorization).split(" ")[1];

        const user = await Users.findById(userId);

        if (!user) {
            res.status(400).json({ message: "Wrong user auth token" });
            return;
        }

        req.userId = userId;
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Auth key error" });
        return;
    }
    next();
    return;
}

module.exports = UserAuthVerifier;
