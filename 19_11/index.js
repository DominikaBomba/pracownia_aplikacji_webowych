//const router1 = require('./routers');
const express = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
/*
model Post {
  id         Int       @id @default(autoincrement())
  title      String
  content    String
  createdAt  DateTime  @default(now())
  categoryId Int
  category   Category  @relation(fields: [categoryId], references: [id])
  comments   Comment[]
}*/

const postsRouter = require('./routery/router_posts');
const categoriesRouter = require('./routery/router_categories');
const commentsRouter = require('./routery/router_comments');
app.use('/post', postsRouter);
app.use('/category', categoriesRouter);
app.use('/comment', commentsRouter);




app.listen(3000);
