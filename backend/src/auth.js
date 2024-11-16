const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (user) => {
    const { email, firstName, lastName } = user;
    return jwt.sign({ email, firstName, lastName }, JWT_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (user) => {
    const { email, firstName, lastName } = user;
    return jwt.sign({ email, firstName, lastName }, JWT_REFRESH_SECRET, { expiresIn: '7d'});
}

const verifyAccessToken = (req, res, next) => {
    let token = req.headers['authorization'];
    token = token?.startsWith('Bearer ') ? token.slice(7) : token;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { email, firstName, lastName } = decoded;
        req.user = { email, firstName, lastName };
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }
}

const verifyRefreshToken = (email, refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        return decoded.email === email ? decoded : null
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}