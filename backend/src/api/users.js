const { Router } = require('express');
const usersService = require('../services/usersService');

const router = Router();

// GET /api/users/currentUserId
router.get('/currentUser', (req, res) => {
    const user = req.user;
    res.send(user);
});

// GET /api/users
router.get('/', async (req, res) => {
    const users = await usersService.getUsers();
    res.send(users);
})

module.exports = router;