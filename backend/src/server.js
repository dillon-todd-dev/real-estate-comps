const express = require('express');
const usersRouter = require('./api/users');
const usersService = require('./services/usersService');
const auth = require('./auth');

const server = express();

server.use(express.json());

server.use('/api', auth.verifyAccessToken);
server.use('/api/users', usersRouter);

server.post('/login', async (req, res) => {
    const { user, token } = await usersService.loginUser(req.body);
    if (!user) {
        res.status(403).json({ error: 'Forbidden' });
    }
    res.status(200).json({ user, token });
});

server.post('/register', async (req, res) => {
    const { user, token } = await usersService.registerUser(req.body);
    res.status(201).json({ user, token });
});

server.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = server;