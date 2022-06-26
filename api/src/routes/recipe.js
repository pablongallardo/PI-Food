const express = require('express');
require('dotenv').config();

const { Recipe, Diet } = require('../db')


const router = express.Router()



router.use(express.json())


router.post('/', async (req, res, next) => {
    const { name, summary, score, healthScore, steps, dietTypes } = req.body

    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            steps,
        })

        let dietDB = await Diet.findAll({
            where: {name: dietTypes}
        })
        newRecipe.addDiet(dietDB)
        res.status(200).send(newRecipe)  
        // res.send('successfull')
    } catch (error) {
        res.json({error:'No se recibieron los parámetros necesarios para crear la receta'})
    };
});



module.exports = router;