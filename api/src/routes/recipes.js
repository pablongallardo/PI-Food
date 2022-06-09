const { Router } = require('express');
var cors = require('cors')
const axios = require('axios');
const { getApiByID, getAllRecipes, getDbId} = require('../controladores/recipes');
const { Recipe, Diet } = require('../db');
const { API_KEY, } = process.env;

const router = Router();

router.use(cors());

router.get('/', async (req, res, next) => {
    // console.log('aca entra')
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes(); 
        
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
           
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        score: e.score,
                        id: e.id
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    score: e.score,
                    id: e.id
                }
            })
            return res.status(200).send(recipes);
        }
    } catch(error) {
       return res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        //expresion regular para encontrar la receta
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let dbRecipesById = await getDbId(id);
            return res.status(200).json(dbRecipesById);
        }else{
            apiRecipeById = await getApiByID(id);
            if(apiRecipeById.data.id){
                let recipeDetails= {
                    image: apiRecipeById.data.image,
                    name: apiRecipeById.data.title,
                    dishTypes: apiRecipeById.data.dishTypes,
                    dietTypes: apiRecipeById.data.diets,
                    summary: apiRecipeById.data.summary,
                    score: apiRecipeById.data.spoonacularScore,
                    healthScore: apiRecipeById.data.healthScore,
                    steps: apiRecipeById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetails);
            }
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

    
    
module.exports = router;