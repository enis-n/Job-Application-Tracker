const userService = require('../services/user.service');

exports.register = async (req, res) => {
    try {
        const newUser = await userService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);

        res.status(200).json({
            success: true,
            token,
            data: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
};

exports.currentUser = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};