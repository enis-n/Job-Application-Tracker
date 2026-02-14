const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

exports.registerUser = async (userData) => {
    const { fullname, email, password } = userData;

    if (!fullname || !email || !password) {
        throw new Error('Please provide all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullname,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);
    return { user, token };
};

exports.loginUser = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);

    user.password = undefined;

    return { user, token };
};