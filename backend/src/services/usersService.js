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
    const refreshToken = auth.generateRefreshToken(email, firstName, lastName);
    return { accessToken, refreshToken };
}

const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await findUserByEmail(email);
    if (!user) {
        console.log(`no user with email: ${email}`);
        return {};
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
        console.log('passwords do not match');
        return {};
    }

    const accessToken = auth.generateAccessToken(user.email, user.firstName, user.lastName);
    const refreshToken = auth.generateRefreshToken(user.email, user.firstName, user.lastName);
    return { accessToken, refreshToken };
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    findUserByEmail
}