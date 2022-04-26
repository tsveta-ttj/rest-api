const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guard');
const preload = require('../middlewares/preload');
const api = require('../services/item');
const { mapErrors } = require('../utils/mappers');

router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        title: req.body.make,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        owner: req.user._id
    }

    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }

});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
    }

    try {
        const result = await api.update(itemId, item);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }

});

router.delete('/:id', preload(), isOwner(),async (req, res) => {

    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end(); 

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

module.exports = router;