const { getDB } = require('./mongo');

async function errorHandler(err, req, res, next) {
    console.error(err);

    try {
        const db = getDB();
        const errorLog = {
            message: err.message,
            stack: err.stack,
            method: req.method,
            path: req.originalUrl,
            body: req.body,
            headers: req.headers,
            timestamp: new Date()
        };
        await db.collection('errorLogs').insertOne(errorLog);
    } catch (mongoErr) {
        console.error("Nie udało się zapisać", mongoErr);
    }

    res.status(500).json({
        error: "bląd serwera",
        message: err.message
    });
}

module.exports = errorHandler;
