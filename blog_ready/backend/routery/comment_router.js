const express = require('express');
const router = express.Router();
const {prisma} = require('../prisma/client.cjs');

router.get('/', async (req, res) => {
    const comments = await prisma.comment.findMany({
        include: { post: true }
    });
    res.json(comments);
});

router.post('/', async (req, res) => {
    const { name, email, postId } = req.body; // 'name' i 'email' są w Twoim schema
    try {
        const newComment = await prisma.comment.create({
            data: {
                name,
                email,
                post: { connect: { id: Number(postId) } }
            }
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd dodawania komentarza" });
    }
});

router.put('/', async (req, res) => {
    const { id, name, email } = req.body;
    try {
        const updatedComment = await prisma.comment.update({
            where: { id: Number(id) },
            data: { name, email }
        });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: "Błąd aktualizacji" });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.comment.delete({ where: { id: Number(id) } });
        res.json({ message: "Komentarz usunięty" });
    } catch (error) {
        res.status(500).json({ error: "Błąd usuwania" });
    }
});

module.exports = router;