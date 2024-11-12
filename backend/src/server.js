const express = require('express');

const server = express();

server.use(express.json());

server.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = server;