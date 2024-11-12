const app = require('./app');
const { config } = require('dotenv');

config();

const initApp = async () => {
    const closeMongoConnection = () => {
        if (app.db) {
            app.db.close(true).then(() => {
                process.exit(0);
            })
        } else {
            process.exit(0);
        }
    }
    process.on('SIGINT', closeMongoConnection);

    try {
        const { MongoClient } = require('mongodb');
        const mongoUrl = process.env.MONGO_URL;

        const db = await MongoClient.connect(mongoUrl);
        app.db = db;

        const server = require('./server');
        const PORT = process.env.PORT || 3000;

        server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
    } catch (err) {
        console.error(`Error starting up: ${err}`);
        process.exit(-2);
    }
}

initApp();