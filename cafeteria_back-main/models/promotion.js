const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotion = new Schema({
    promotionId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    promo: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const promotionSchema = mongoose.model('promotion', promotion);
module.exports = promotionSchema;