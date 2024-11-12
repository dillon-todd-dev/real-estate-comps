const app = require('./app');
const { config } = require('dotenv');

config();

const initApp = async () => {
    const closeMongoConnection = async () => {
        if (app.db) {
            await app.db.close(true);
            process.exit(0);
        } else {
            process.exit(0);
        }
    }
    process.on('SIGINT', closeMongoConnection);

    try {
        const { MongoClient } = require('mongodb');
        const mongoUrl = process.env.MONGO_URL;

        const client = new MongoClient(mongoUrl);
        const db = client.db('comps');

        console.log('successfully connected to mongodb');
        
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