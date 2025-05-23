const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItem = new Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true,
    },
    inventoryItem: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    calorieCount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    categoryType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const menuItemSchema = mongoose.model('menuItem', menuItem);
module.exports = menuItemSchema;