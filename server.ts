import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import CONFIG from './configs';
import LOG from './utils/logging';
import ROUTES from './routes/general';

const NAMESPACE: string = 'SERVER';
const ENV_SERVICE: string = 'v1';
const router = express();
// MONGODB CONNECTOR
mongoose
    .connect(CONFIG.mongo.url, CONFIG.mongo.options)
    .then(() => {
        LOG.info(NAMESPACE, 'Connected to MongoDB');
    })
    .catch((err) => {
        LOG.error(NAMESPACE, err.message, err);
    });
// ADD LOGGER FOR REQUEST
router.use((req, res, next) => {
    LOG.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('FINISH', () => {
        LOG.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
// ADD BODY PARSER
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// SETTING API RULES HEADER
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// REGISTER ROUTE
router.use(`/${ENV_SERVICE}/`, ROUTES);

// ERROR HANDLE
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(CONFIG.server.port, () => LOG.info(NAMESPACE, `Server is running ${CONFIG.server.hostname}:${CONFIG.server.port}`));
