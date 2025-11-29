const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/', async (req, res, next) => {
 try {
     const comments = await prisma.comment.findMany({
         include: {post: true}
     });

     res.json(comments);
 }catch(err) {
     next(err);
 }
});

router.post('/', async (req, res, next) => {
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
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const { id, content } = req.body;

    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { content },
            include: { post: true }
        });
        res.json(updatedComment);
    } catch (error) {
       next(error);
    }
});

router.delete('/', async (req, res, next) => {
    const { id } = req.body;

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id }
        });
        res.json({ message: "Komentarz usunięty", comment: deletedComment });
    } catch (error) {next(error);
    }
});

module.exports = router;