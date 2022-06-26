import {
    GET_RECIPES,
     ADD_RECIPE,
     DIET_TYPE_FILTER,
     GET_RECIPE_DETAILS,
     ALPHABETICAL_SORT,
     SCORE_SORT,
     SEARCH_RECIPE,
     GET_DIET_TYPES,
     
    } from '../actions/index'

const initalState = {
    recipes: [],
    allRecipes: [],
    dietTypes: [],
    recipeDetails: {},

}

export default function reducer (state = initalState, {type,payload}) {
    switch (type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: payload,
                allRecipes: payload
            };
        case DIET_TYPE_FILTER:
            const allRecipes = state.allRecipes;
            const filteredByDietType = allRecipes.filter(r => r.dietTypes?.some(d => d.toLowerCase() === payload.toLowerCase()));
            return {
                ...state,
                recipes: filteredByDietType
            }
        case ALPHABETICAL_SORT:
            let sortedRecipes = [...state.recipes];
            sortedRecipes = payload === 'atoz' ? 
            state.recipes.sort( function(a , b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) :    
            state.recipes.sort(function(a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
            });
            return {
                ...state,
                recipes: sortedRecipes
            }

        case SCORE_SORT:
           let sortedByScore = [...state.recipes];
           sortedByScore = payload === 'asc'?
           state.recipes.sort(function(a , b){
            if (a.score > b.score ) return 1;
            if (a.score < b.score ) return -1;
            return 0;
           }) :
           state.recipes.sort(function(a, b){
            if(a.score < b.score) return 1;
            if(a.score > b.score) return -1;
            return 0;
           })
           return {
            ...state,
            recipes:sortedByScore
           }

        case SEARCH_RECIPE:
            return{
                ...state,
                recipes:payload
            }
        
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: payload
            }

        case ADD_RECIPE:
            return{
                ...state,
            }
        
        case GET_DIET_TYPES:
            return {
                ...state,
                dietTypes: payload
            }



            default:
                return state

    }
}

// export default reducer;