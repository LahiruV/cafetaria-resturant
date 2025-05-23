const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isLoyal: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const userSchema = mongoose.model('user', user);
module.exports = userSchema;