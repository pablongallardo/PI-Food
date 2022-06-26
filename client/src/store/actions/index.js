import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const ADD_RECIPE = "ADD_RECIPE";
export const DIET_TYPE_FILTER = "DIET_TYPE_FILTER";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const ALPHABETICAL_SORT = "ALPHABETICAL_SORT";
export const SCORE_SORT = "SCORE_SORT";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_DIET_TYPES = "GET_DIET_TYPES";
export const LOCAL_HOST = "http://localhost:3001";

export function  getRecipes() {
       return function(dispatch){
           axios.get(`${LOCAL_HOST}/recipes`)
        .then((response) => {
            return dispatch({type:GET_RECIPES, payload: response.data});
        })
        .catch((error) => {
            console.error(error)
        })
       }
}

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes?name=${payload}`);
            console.log('aca esta')
            return dispatch({type: SEARCH_RECIPE, payload: response.data});

        } catch (error) {
            return alert('Recipe not Found!');
        }
    }
}

export function getDietTypes(){
    return async function(dispatch){
        try {
            var response = await axios.get(`http://localhost:3001/types`);
            return dispatch({type:GET_DIET_TYPES, payload:response.data.map(d => d.name)});
        } catch (error) {
            console.log(error);
        }
    }
}

export function addRecipe(payload) {
    return async function(dispatch) {

        try {
            console.log(payload);
            var response = await axios.get(`http://localhost:3001/recipe`, payload);
            console.log(payload)
            return response;
            
        } catch (error) {
            console.log(error);
        }
    }
}



export const getRecipeDetails = (id) => dispatch => {
   return axios(`http://localhost:3001/recipes/${id}`)
   .then(response => dispatch({type:GET_RECIPE_DETAILS, payload:response.data}))
   .catch(err => console.log(err));
}
// export function getRecipeDetails(payload) {
//     return async function(dispatch) {
//         try {
//             var response = await axios.get(`http://localhost:3001/api/recipes/${payload}`);
//             return dispatch({type:GET_RECIPE_DETAILS, payload:response.data});
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


export function dietTypeFilter(payload){
    return {
        type:DIET_TYPE_FILTER, 
        payload
    }
}

export function alphabeticalSort(payload){
    return {
         type:ALPHABETICAL_SORT, 
        payload
    }
}

export function scoreSort(payload){
    return {
        type:SCORE_SORT,
        payload
    }
}