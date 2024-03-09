const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (request, response) => {
    const FC = mongoose.connection.db.collection('FoodCategory');
    const FI = mongoose.connection.db.collection('FoodItems');
    try {
        const FoodCategory = FC.find({});

        FoodCategory.toArray().then(async (x) => {
            var FoodItems = [];
            await Promise.all(x.map(async (category) => {
                const items = await FI.find({ CategoryName: category.CategoryName }).toArray();
                FoodItems.push(items);
            }));

            return response.status(200).json({ FoodItems: FoodItems });
        })
    } catch (error) {
        return response.status(500).json(error);
    }
})

module.exports = router;