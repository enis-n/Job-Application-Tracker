const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Added bcrypt import

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

    // --- LOGIC MOVED HERE ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullname,
        email,
        password: hashedPassword // Save the hashed version
    });

    const token = generateToken(user._id);
    return { user, token };
};

exports.loginUser = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    // Select password because 'select: false' is in the schema
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // --- LOGIC MOVED HERE ---
    // Instead of user.matchPassword, we use bcrypt directly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);

    // Remove password from the user object before returning to controller
    user.password = undefined;

    return { user, token };
};