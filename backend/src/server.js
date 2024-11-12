const express = require('express');
const usersRouter = require('./api/users');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);

server.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = server;