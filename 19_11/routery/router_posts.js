const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {category: false, comments: false}
    })
    res.send(posts);
})

router.post('/', async (req, res) => {
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
        console.error(error);
        res.status(500).json({ error: "Nie udało się dodać" });
    }
});


router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedp = await prisma.post.delete({
            where: {id: id}
        })

        res.status(201).json(deletedp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nie usuneło" });
    }
});
router.put('/', async (req, res) => {
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
        console.error(error);
        res.status(500).json({ error: "Nie zaktualizowano" });
    }
});

module.exports = router;