// All API routes are here

const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get ALL Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        // sorting by the date in a descending order
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route POST api/items
// @desc Post an item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });
    newItem.save()
        .then(item => res.json(item));

});

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({
                success: true
            }))
        ).catch(err => res.status(404).json({ success: false }))
});

module.exports = router;
