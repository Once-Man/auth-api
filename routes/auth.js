const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
require('dotenv').config();

router.get('/', (req, res) => {
    res.send('OK Home...');
});

router.post('/register', async(req, res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.status(200).send({user: newUser});
    }catch(error){
        res.status(400).send({status: 'failed', msg: error})
    }
});

router.post('/login', async(req, res) => {
    const {error} = loginValidation(req.data);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password Invalid');

    const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;