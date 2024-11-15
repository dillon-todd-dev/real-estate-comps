const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (email, firstName, lastName) => {
    return jwt.sign({ email, firstName, lastName }, JWT_SECRET, { expiresIn: '1800s' });
}

const generateRefreshToken = (email, firstName, lastName) => {
    return jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '7d'})
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
        return decoded.email === email;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}