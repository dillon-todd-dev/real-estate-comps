const { Router } = require('express');
const usersService = require('../services/usersService');

const router = Router();

// GET /api/users/currentUserId
router.get('/currentUser', async (req, res) => {
    const user = req.user;
    res.json({ user });
});

// GET /api/users
router.get('/', async (req, res) => {
    const users = await usersService.getUsers();
    res.json({ users });
})

module.exports = router;