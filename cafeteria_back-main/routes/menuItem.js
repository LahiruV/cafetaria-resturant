const router = require('express').Router();
let menuItem_Schema = require('../models/menuItem');

router.route('/addMenuItem').post((req, res) => {
    const { itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status } = req.body;
    const menuItem = new menuItem_Schema({ itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status });
    menuItem.save()
        .then(() => res.json('Item Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update").put(async (req, res) => {
    const { itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status } = req.body;
    const menuItem = {
        itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status
    }
    const update = await menuItem_Schema.findOneAndUpdate({ itemId: itemId }, menuItem).then(() => {
        res.status(200).send({ status: "Item Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/delete/:itemId").delete(async (req, res) => {
    let itemId = req.params.itemId;
    menuItem_Schema.findOneAndDelete({ itemId: itemId })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allMenuItem").get(async (req, res) => {
    menuItem_Schema.find()
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;