import User from "../module/user-module.js";

export const getInfoUser = async (req, res) => {
    console.log(req.params.id);
    const data = await User.find();
    res.status(200).json(data);
};




