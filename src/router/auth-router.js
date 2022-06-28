import express from "express";
const route = express.Router();
import {login,register} from "../controller/auth-controller.js";

route.post("/create", register);
route.post('/login',login);

export default route;