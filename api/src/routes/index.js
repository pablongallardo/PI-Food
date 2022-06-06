const { Router } = require('express');


const recipesRouter = require('./recipes');
const typesRouter = require('./diets');
const recipeRouter = require('./recipe');

const router = Router();



// Configuración de rutas
router.use('/recipes', recipesRouter);
router.use('/types', typesRouter);
router.use('/recipe', recipeRouter);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
