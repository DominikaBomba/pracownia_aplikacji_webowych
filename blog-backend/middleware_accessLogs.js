const {getDB} = require("./mongo");


async function logRequests(req, res, next) {
    const db = getDB();

    const log = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        timestamp: new Date()
    };

    try {
        await db.collection("accessLogs").insertOne(log);
        console.log("zapisano loga");
    } catch (err) {
        console.error("Nie udało się zapisać:", err);
    }
    console.log("zapisano loga");
    next();
}

module.exports = logRequests;