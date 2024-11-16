const express = require('express');
const usersRouter = require('./api/users');
const usersService = require('./services/usersService');
const auth = require('./auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use('/api', auth.verifyAccessToken);
server.use('/api/users', usersRouter);

server.post('/login', async (req, res) => {
    const user = await usersService.loginUser(req.body);
    if (!user) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const accessToken = auth.generateAccessToken(user);
    const refreshToken = auth.generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7 * 1000
    })
    res.status(200).json({ accessToken });
});

server.post('/register', async (req, res) => {
    const { accessToken, refreshTokenCookie } = await usersService.registerUser(req.body);
    res.setHeader('Set-Cookie', refreshTokenCookie);
    res.status(201).json({ accessToken });
});

server.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ success: false, message: 'Refresh token not found' });
    }

    const { user } = auth.verifyRefreshToken(refreshToken);
    if (!user) {
        return res.status(403).json({ success: false, message: 'Invalid refresh token' });
    }

    const newAccessToken = auth.generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
});

server.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = server;