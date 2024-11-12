const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (email) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1800s' });
}

const verifyAccessToken = (req, res, next) => {
    let token = req.headers['authorization'];
    token = token?.startsWith('Bearer ') ? token.slice(7) : token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;

        next();
    })
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}