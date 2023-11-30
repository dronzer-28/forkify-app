import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('test');

const controlRecipe = async function(){
  try{

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    //1) loading recipe
    await model.loadRecipe(id);
    
    //2) rendering recipe
    recipeView.render(model.state.recipe);

  } catch(err){
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try{
    await model.loadSearchResults('pizza');
  } catch(err){
    console.log(err);
  }
}

controlSearchResults();

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

// ['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipe));