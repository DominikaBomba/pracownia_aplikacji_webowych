const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async (req, res, next) => {
    try {
        console.log("w get jest");
        const posts = await prisma.post.findMany({
            include: { category: false, comments: false }
        });
        res.send(posts);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { title, content, categoryId } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                category: { connect: { id: categoryId } }
            },
            include: { category: true }
        });

        res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
});


router.delete('/', async (req, res, next) => {
    const { id } = req.body;
    try {
        const deletedp = await prisma.post.delete({
            where: {id: id}
        })

        res.status(201).json(deletedp);
    } catch (error) {
       next(error);
    }
});
router.put('/', async (req, res, next) => {
    const { id, title, content, categoryId } = req.body;
    try {
        const updatedp = await prisma.post.update({
            where: {id},
            data: {
                title,
                content,
                category: categoryId ? { connect: { id: categoryId } } : undefined
            },
            include: {category: true}
        })

        res.status(201).json(updatedp);
    } catch (error) {
       next(error);
    }
});

module.exports = router;