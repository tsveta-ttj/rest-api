const router = require('express').Router();
const { isGuest } = require('../middlewares/guard');
const { register, login, logout } = require('../services/users');
const { mapErrors } = require('../utils/mappers');

router.post('/register', async (req, res) => {
    
    try {
        if (req.body.email.trim() == '' || req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Email/Username and password is required!');
        }
        const result = await register(req.body.email.trim().toLowerCase(), req.body.username.trim(), req.body.password.trim());
        res.status(201).json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login',isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(401).json({ message: error });
    }

});

router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});



module.exports = router;
