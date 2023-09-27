const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middleware/Logger");
const CustomRouter = require("./router");

dotenv.config();

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("connected :", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(socket.id, "joined the room", roomId);
    });

    let bufferTimeout;

    socket.on("play-video", (roomId, timestamp) => {
        console.log("socket play-video");
        clearTimeout(bufferTimeout);
        socket.to(roomId).emit("seek-to", timestamp);
    });

    socket.on("pause-video", (roomId, timestamp) => {
        console.log("socket pause-video");
        socket.to(roomId).emit("pause-at", timestamp);
    });

    socket.on("buffer-video", (roomId, timestamp) => {
        bufferTimeout = setTimeout(() => {
            console.log("socket buffer-video");
            socket.to(roomId).emit("buffer-at", timestamp);
        }, 1500);
    });

    socket.on("update-room", (roomId) => {
        socket.to(roomId).emit("get-room-details");
    });
});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        throw error;
    }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);

app.use(CustomRouter);

httpServer.listen(port, function () {
    connectToMongoDB();
    console.log(`App is listening to port ${port}`);
});
