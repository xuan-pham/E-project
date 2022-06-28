import User from "../module/user-module.js";
import bcrypt from "bcryptjs";
import {registerValidators, loginValidators} from "../validators/auth-validators.js";

// create user
export const register = async (req, res) => {
    try {
        const resultRegister = await registerValidators.validateAsync(req.body);
        if (resultRegister.error) {
            return res.status(500).json((resultRegister.error.details[0].message));
        }
        const {name, email, password} = req.body;
        const userExit = await User.findOne({email});
        if (userExit.email === email) {
            return res.status(400).json({message: "Email đã tồn tại"});
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);
            const userNew = await new User({
                name, email, password: hashPass,
            }).save();
            if (!userNew) {
                return res
                    .status(400)
                    .json({message: `Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.`})
            }
            return res.status(200).json(userNew);
        }
    } catch (err) {
        return res.status(500).json(err)
    }
};


export const login = async (req, res) => {
    try {
        const resultLogin = await loginValidators.validateAsync(req.body);
        if (resultLogin.error) {
            return res.status(500).json((resultLogin.error.details[0].message));
        }
        const {email, password} = req.body;
        const userInfo = await User.findOne({email}).lean();
        if (!userInfo) {
            return res.status(401).json({message: 'Tên đăng nhập hoặc mật khẩu không đúng.'});
        }
        const {password: hashPassword} = userInfo;
        const veryFileUser = bcrypt.compareSync(password, hashPassword);
        if (!veryFileUser) {
            return res.status(401).json({message: 'Tên đăng nhập hoặc mật khẩu không đúng.'});
        } else {
            const dataForAccessToken = {
                id: userInfo._id,
            };


            return res.status(200).json({message: `thanh cong`})
        }

    } catch (err) {
        return res.status(500).json({message: err})
    }
}