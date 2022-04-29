const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const JWT_SECRET = 'fkjefejknakedj';
const blalcklist = [];

async function register(email, username, password) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('Email is taken');
    }

    const user = new User({
        email,
        username,
        hashedPassword: await hash(password, 10)
    });

    await user.save();
    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

function logout(token) {
    blalcklist.push(token);
}

function createSession(user) {

    return {
        email: user.email,
        username: user.username,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            username: user.username,
            _id: user._id
        }, JWT_SECRET)
    }
}

function verifySession(token) {
    if (blalcklist.includes(token)) {
        throw new Error('Token is invalid');

    }
    const payload = jwt.verify(token, JWT_SECRET);

    return {
        email: payload.email,
        username: payload.username,
        _id: payload._id,
        token
    };

}

module.exports = {
    register,
    login,
    logout,
    verifySession
}