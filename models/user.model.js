const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')


const userShema = new mongoose.Schema({

    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true, lowercase: true
    },
    password: {
        type: String, default: false, required: true
    },
    // tasks: [mongoose.model('todo')]


}, { timestamps: true })

userShema.pre("save", true, async function (eror, next) {
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next()
})



const User = mongoose.model('user', userShema);

module.exports = User;