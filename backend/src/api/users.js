const { Router } = require('express');
const usersService = require('../services/usersService');

const router = Router();

router.get('/currentUserId', (req, res) => {
    const user = req.user;
    res.send(user ? user._id : '');
});

router.post('/login', async (req, res) => {
    const user = await usersService.loginUser(req.body);
    if (!user) {
        res.status(403).json({ error: 'Forbidden' });
    }
    res.status(200).json({ user });
})

router.post('/register', async (req, res) => {
    const user = await usersService.registerUser(req.body);
    res.status(201).json({ user });
})

router.get('/', async (req, res) => {
    const users = await usersService.getUsers();
    res.send(users);
})

module.exports = router;