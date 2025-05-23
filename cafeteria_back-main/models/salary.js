const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salary = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    fullSalary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const salarySchema = mongoose.model('salary', salary);
module.exports = salarySchema;
