const express = require('express');
const router = express.Router();
const {prisma} = require('../prisma/client.cjs');

router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { comments: true }
        });
        res.json(posts);
    } catch (error) {
        // res.status(500).json({ error: "Błąd pobierania postów" });
        res.status(500).send(error);
    }
});


router.post('/', async (req, res) => {
    const { title, body, userId } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                body,
                userId: Number(userId)
            }
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd dodawania posta" });
    }
});


router.put('/', async (req, res) => {
    const { id, title, body } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, body }
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Błąd aktualizacji posta" });
    }
});


router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.post.delete({
            where: { id: Number(id) }
        });
        res.json({ message: "Post usunięty" });
    } catch (error) {
        res.status(500).json({ error: "Błąd usuwania posta" });
    }
});

module.exports = router;