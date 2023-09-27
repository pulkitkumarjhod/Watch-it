const Users = require("../../models/Users");

const bcrypt = require("bcrypt");

async function NewUser(req, res, next) {
    const {
        body: { email, password },
    } = req;

    try {
        if (!email || !password) {
            res.status(400).json({ message: "Params no fulfilled" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User created",
            userId: newUser._id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong in server" });
        return;
    }
    next();
    return;
}

module.exports = NewUser;
