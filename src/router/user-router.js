import express from "express";
const route = express.Router();
import {getInfoUser} from "../controller/user-controller.js";

route.get("/:id", getInfoUser);

export default route;
