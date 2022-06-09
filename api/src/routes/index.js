const { Router } = require('express');
// var cors = require('cors')

const recipesRouter = require('./recipes');
const typesRouter = require('./diets');
const recipeRouter = require('./recipe');

const router = Router();

// router.use(cors());


// Configuración de rutas
router.use('/recipes', recipesRouter);
router.use('/types', typesRouter);
router.use('/recipe', recipeRouter);

router.get('/', async function (req, res) {
    res.redirect('/recipes')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
