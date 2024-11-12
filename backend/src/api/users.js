const { Router } = require('express');
const usersService = require('../services/usersService');

const router = Router();

// GET /api/users/currentUserId
router.get('/currentUserId', (req, res) => {
    const user = req.user;
    res.send(user ? user._id : '');
});

// GET /api/users
router.get('/', async (req, res) => {
    const users = await usersService.getUsers();
    res.send(users);
})

module.exports = router;