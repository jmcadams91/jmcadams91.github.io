const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
    // Validate message to ensure that all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: ''
        });

        user.setPassword(req.body.password);
        await user.save();

        const token = user.generateJWT();
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !user.validPassword(req.body.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.generateJWT();
        return res.status(200).json({ token });  
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Login failed", error: err });
    }
};

module.exports = {
    register,
    login
};
