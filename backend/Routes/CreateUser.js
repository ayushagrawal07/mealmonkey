const express = require('express');
const router = express.Router()

const User = require('../models/User')

const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "myfirstprojectfgonnabesuperb";

router.post("/creatuser", [
    body('email', 'Incorrect email').isEmail(),
    // body('email').withMessage('Incorrect email')

    // body('name').withMessage('Name should contain only letters'),


    // body('phone').withMessage('Incorrect phone number'),
    // body('password','Password should be alphanumeric').isAlphanumeric(),
    // body('password').withMessage('Password should be alphanumeric'),
    body('password', 'Minimum Length is 5').isLength({ min: 5 })
    //  body('password').withMessage('Password should contain minimum 5 chracters')
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)


        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword


            })
            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email', 'Incorrect email').isEmail(),
    // body('email').withMessage('Incorrect email')

    // body('name').withMessage('Name should contain only letters'),


    // body('phone').withMessage('Incorrect phone number'),
    // body('password','Password should be alphanumeric').isAlphanumeric(),
    // body('password').withMessage('Password should be alphanumeric'),
    body('password', 'Minimum Length is 5').isLength({ min: 5 })
    //  body('password').withMessage('Password should contain minimum 5 chracters')
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Enter valid email or password" });
        }
       
        let email = req.body.email;


        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Enter valid email" })
            }
            const pwdcompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdcompare)
                return res.status(400).json({ errors: "Incorrect password" })

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken })
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;