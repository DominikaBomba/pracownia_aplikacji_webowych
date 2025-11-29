const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { connectDB } = require('./mongo');
const middlewarelogs = require('./middleware_accessLogs');
const middlewareErrors= require('./middleware_errorLogs');

const postsRouter = require('./routery/router_posts');
const categoriesRouter = require('./routery/router_categories');
const commentsRouter = require('./routery/router_comments');

const app = express();
const prisma = new PrismaClient();

async function startServer() {
    try {
        await connectDB();
        console.log("MongoDB działa");

        app.use(express.json());
        app.use(middlewarelogs);

        app.use('/post', postsRouter);
        app.use('/category', categoriesRouter);
        app.use('/comment', commentsRouter);

        app.use(middlewareErrors);

        app.listen(3000, () => {
            console.log("Serwer działa na porcie 3000");
        });
    } catch (err) {
        console.error("Nie udało się połączyć z MongoDB:", err);
    }
}

startServer();
