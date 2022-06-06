const { Router } = require('express');
var cors = require('cors')
const axios = require('axios');
const { getApiById, getAllRecipes, getDbById} = require('../controladores/recipes');
const { Recipe, Diet } = require('../db');
const { API_KEY, } = process.env;

const router = Router();

router.use(cors());

router.get('/', async (req, res, next) => {
    // console.log('aca entra')
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes()    
        
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
       return res.status(400).send('Aca esta el  error');
    }
});


    
    
module.exports = router;