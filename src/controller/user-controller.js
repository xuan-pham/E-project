import User from "../module/user-module.js";
import bcrypt from "bcryptjs";
import {UserValidators} from "../validators/user-validators.js";

export const getInfoUser = async (req, res) => {
  console.log(req.params.id);
  const data = await User.find();
  res.status(200).json(data);
};

// create user
export const createUser = async (req, res) => {
  const result = await UserValidators.validateAsync(req.body);
  if (result.error) {
    throw new Error((result.error.details[0].message));
  }
  const {name, email, password} = req.body;
  const userExit = await User.findOne({email});
  if (userExit.email === email) {
    res.status(400).json("Email đã tồn tại");
  }

  console.log(userExit);
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  const userNew = await new User({
    name,
    email,
    password: hashPass,
  }).save();
  res.status(200).json(userNew);
};
