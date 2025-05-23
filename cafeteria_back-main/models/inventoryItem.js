const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryItem = new Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    },
    mnf: {
        type: String,
        required: true,
    },    
}, {
    timestamps: true
});
const inventoryItemSchema = mongoose.model('inventoryItem', inventoryItem);
module.exports = inventoryItemSchema;