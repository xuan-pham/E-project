import express from "express";

const route = express.Router();
import {getInfoUser, createUser} from "../controller/user-controller.js";

route.get("/:id", getInfoUser);
route.post("/create", createUser);

export default route;
