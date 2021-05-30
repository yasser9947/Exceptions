const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post('/', async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("email is not found");
        if (!bcrypt.compareSync(password, user.password)) throw new Error("password not correct");
        user.password = undefined
        let payload = { user }
        let token = jwt.sign(payload, 'secret', { expiresIn: 60 * 60 })
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})














module.exports = router;
