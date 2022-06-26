const axios = require("axios");
const e = require("express");
const db = require("../db");
const { Recipe, Diet } = require("../db");
const { API_KEY, API_KEY_2, API_KEY3 } = process.env;

// const API_ROUTES = {
//   TOTAL_API: `https://api.spoonacular.com/recipes/complexSearch?apiKey=83f99238b4d74719b4c043f031aaf582&addRecipeInformation=true`,
// };

// ME TRAIGO LA INFO DESDE API

const getApiInfo = async () => {
     const urlApi = await axios.get(
  // `https://api.spoonacular.com/recipes/complexSearchapiKey=${API_KEY}&addRecipeInformation=true`)
 ` https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true `);
  const apiInfo = await urlApi.data.results.map(e => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      score: e.spoonacularScore,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      })
    };
  });
  return apiInfo;
};

//OBTENGO INFO DE LA DB

const getInfoDB = async () => {
  return await Recipe.findAll({
    incluide: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// OBTENGO INFO DE ID DESDE LA API

const getApiByID = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_2}`
  );
};

//OBTENGO EL ID DESDE LA DATA BASE

const getDbId = async (id) => {
  return await Recipe.findByPk(id, {
    incluide: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// ME TRAIGO TOOOOODA LA INFORMACION

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getInfoDB();
  const totalInfo = apiInfo.concat(dbInfo);

  return totalInfo;
};

module.exports = {
  getApiInfo,
  getInfoDB,
  getAllRecipes,
  getApiByID,
  getDbId,
};
