const app = require('../app');
const auth = require('../auth');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
    const query = { email };
    return await app.db.collection('users').findOne(query);
}

const getUsers = async () => {
    return await app.db.collection('users').find().toArray();
}

const registerUser = async (userData) => {
    const { email, password, firstName, lastName } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await app.db.collection('users').insertOne({ email, password: hashedPassword, firstName, lastName });
    const accessToken = auth.generateAccessToken(email, firstName, lastName);
    const refreshTokenCookie = auth.generateRefreshToken(email, firstName, lastName);
    return { accessToken, refreshTokenCookie };
}

const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await findUserByEmail(email);
    if (!user) {
        console.log(`no user with email: ${email}`);
        return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
        console.log('passwords do not match');
        return null;
    }

    return user;
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    findUserByEmail
}