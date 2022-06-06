const db = require("../db");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, API_KEY_2 } = process.env;

const API_ROUTES = `https://api.spoonacular.com/recipes/complexSearchapiKey=${API_KEY}&addRecipeInformation=true`;

// ME TRAIGO LA INFO DESDE API

const getApiInfo = async () => {
//   const urlApi = await axios.get(
// `https://api.spoonacular.com/recipes/complexSearchapiKey=${API_KEY}&addRecipeInformation=true`)
    // 'https://api.spoonacular.com/recipes/complexSearch?apiKey=3a62965b699f42f2927b65cd35a1f49b&addRecipeInformation=true' );
  const apiInfo = await API_ROUTES.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      summary: e.summary,
      dietTypes: e.diets,
      score: e.spoonacularScore,
      dishTypes: e.dishTypes,
      steps: e.analizedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
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
    `https://api.spoonacular.com/recipes/${id}/information?3a62965b699f42f2927b65cd35a1f49b`
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
    const apiInfo = await getApiInfo()
    const dbInfo = await getInfoDB();
    const totalInfo = apiInfo.concat(dbInfo);

    return totalInfo;
}

module.exports = {
    getApiInfo, 
    getInfoDB, 
    getAllRecipes,
    getApiByID,
    getDbId
}
