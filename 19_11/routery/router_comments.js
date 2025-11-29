const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/', async (req, res) => {
    const comments = await prisma.comment.findMany({
        include: { post: true }
    });
    res.json(comments);
});

router.post('/', async (req, res) => {
    const { content, postId } = req.body;

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                post: { connect: { id: postId } }
            },
            include: { post: true }
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nie udało się dodać" });
    }
});

router.put('/', async (req, res) => {
    const { id, content } = req.body;

    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { content },
            include: { post: true }
        });
        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nie udało się zaktualizować " });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id }
        });
        res.json({ message: "Komentarz usunięty", comment: deletedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nie udało się usunąć " });
    }
});

module.exports = router;