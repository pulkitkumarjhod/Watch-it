const express = require("express");
const roomRouter = express.Router();

const CreateRoom = require("../controller/Rooms/CreateRoom");
const GetAllRooms = require("../controller/Rooms/GetAllRooms");
const JoinRoom = require("../controller/Rooms/JoinRoom");
const LeaveRoom = require("../controller/Rooms/LeaveRoom");
const MyData = require("../controller/Users/MyData");
const UpdateRoom = require("../controller/Rooms/UpdateRoom");
const UserAuthVerifier = require("../middleware/UserAuthVerifier");
const GetRoomDetails = require("../controller/Rooms/GetRoomDetails");
const DeleteAllRooms = require("../controller/Rooms/DeleteAllRooms");

roomRouter.use(UserAuthVerifier);

roomRouter.post("/create-room", CreateRoom);

roomRouter.get("/get-all-rooms", GetAllRooms);

roomRouter.post("/join-room/:roomCode", JoinRoom);

roomRouter.get("/get-room/:roomCode", GetRoomDetails);

roomRouter.put("/update-room", UpdateRoom);

roomRouter.delete("/leave-room", LeaveRoom);

roomRouter.delete("/delete-all-rooms", DeleteAllRooms);

roomRouter.get("/my-data", MyData);

module.exports = roomRouter;
