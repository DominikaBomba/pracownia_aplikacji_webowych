const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            include: { posts: true }
        });
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { name } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: { name },
            include: { posts: true }
        });
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const { id, name } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { name },
            include: { posts: true }
        });
        res.json(updatedCategory);
    } catch (error) {
        next(error);
        res.status(500).json({ error: "Nie udało się zaktualizować kategorii" });
    }
});

router.delete('/', async (req, res, next) => {
    const { id } = req.body;

    try {
        const deletedCategory = await prisma.category.delete({
            where: { id }
        });
        res.json({ message: "Kategoria usunięta", category: deletedCategory });
    } catch (error) {
        next(error);
        res.status(500).json({ error: "Nie udało się usunąć kategorii" });
    }
});


module.exports = router;