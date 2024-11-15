const express = require('express');
const usersRouter = require('./api/users');
const usersService = require('./services/usersService');
const auth = require('./auth');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api', auth.verifyAccessToken);
server.use('/api/users', usersRouter);

server.post('/login', async (req, res) => {
    const { accessToken } = await usersService.loginUser(req.body);
    if (!accessToken) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    res.status(200).json({ accessToken });
});

server.post('/register', async (req, res) => {
    const { accessToken } = await usersService.registerUser(req.body);
    res.status(201).json({ accessToken });
});

server.post('/refresh', async (req, res) => {
    const { email, refreshToken } = req.body;
    const isValid = auth.verifyRefreshToken(email, refreshToken);
    if (!isValid) {
        return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }

    const user = await usersService.findUserByEmail(email);
    const accessToken = auth.generateAccessToken(user.email, user.firstName, user.lastName);
    const newRefreshToken = auth.generateRefreshToken(user.email, user.firstName, user.lastName);
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
});

server.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = server;