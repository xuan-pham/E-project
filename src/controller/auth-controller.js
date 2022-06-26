import User from "../module/user-module.js";
import bcrypt from "bcryptjs";
import {UserValidators} from "../validators/user-validators.js";

// create user
export const register = async (req, res) => {
    try {
        const result = await UserValidators.validateAsync(req.body);
        if (result.error) {
            return res.status(500).json((result.error.details[0].message));
        }
        const {name, email, password} = req.body;
        const userExit = await User.findOne({email});
        if (userExit.email === email) {
            return res.status(400).json({message: "Email đã tồn tại"});
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);
            const userNew = await new User({
                name,
                email,
                password: hashPass,
            }).save();
            return res.status(200).json(userNew);
        }
    } catch (err) {
        return res.status(500).json(err)
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userInfo = await User.findOne({email}).lean();
        const {password: hashPassword, ...user} = userInfo;
        const veryFileUser = bcrypt.compareSync(password, hashPassword)

        return res.status(200).json({data: 'Thanh Cong'});
    } catch (err) {
        return res.status(500).json({message: err})
    }
}