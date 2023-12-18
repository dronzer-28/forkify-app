import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}/${id}`);
        
        const {recipe} = data.data;
        state.recipe = {
            id : recipe.id,
            title : recipe.title,
            publisher : recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
        
        console.log(state.recipe);
    } catch(err){
        console.error(`${err} 💥`);
        throw err;
    }
};

export const loadSearchResults = async function(query){
    try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        // console.log(data);
        state.search.result = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        }); 
        console.log(state.search.result);
    } catch(err) {
        console.error(`${err} 💥`);
        // throw err;
    }
};


export const searchResultsPerPage = function(page = state.search.page){
    state.search.page = page;

    const start = (page-1)*state.search.resultsPerPage;
    const end = page*state.search.resultsPerPage;

    return state.search.result.slice(start, end);
};

export const updateServings = function(newServings){
    state.recipe.ingredients.foreach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;


    });
    state.recipe.servings = newServings;
}