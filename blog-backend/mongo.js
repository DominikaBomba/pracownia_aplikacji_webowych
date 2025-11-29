const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dominikabomba:haslo@cluster0.xzqppgp.mongodb.net/blogBackend?retryWrites=true&w=majority"; // np. z MongoDB Atlas
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log("Połączono z MongoDB Atlas");
        db = client.db("blogBackend"); // nazwa bazy
        return db;
    } catch (err) {
        console.error("Błąd połączenia z MongoDB:", err);
    }
}

function getDB() {
    if (!db) throw new Error("Database not connected!");
    return db;
}

module.exports = { connectDB, getDB };
