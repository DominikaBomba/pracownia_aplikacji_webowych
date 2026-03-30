const {PrismaClient} = require('@prisma/client')
const {PrismaMariaDb} = require('@prisma/adapter-mariadb')
require('dotenv/config')

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'blog_ready',
})

const prisma = new PrismaClient({adapter});

module.exports = {
    prisma
}