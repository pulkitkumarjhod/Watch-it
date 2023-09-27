const Users = require("../../models/Users");

const bcrypt = require("bcrypt");

async function LoginUser(req, res, next) {
    const {
        body: { email, password },
    } = req;

    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            res.status(403).json({ message: "Wrong email" });
            return;
        }

        if (!(await bcrypt.compare(password, user.password))) {
            res.status(403).json({ message: "Incorrect password" });
            return;
        }

        res.status(202).json({
            message: "Logged in succesfully",
            userId: user._id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong in server" });
        return;
    }

    next();
    return;
}

module.exports = LoginUser;
