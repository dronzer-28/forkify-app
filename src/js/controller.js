import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2



if(module.hot){
  module.hot.accept();
}

const controlRecipe = async function(){
  try{

    const id = window.location.hash.slice(1);

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
    resultsView.renderSpinner();
    //1) get query
    const query = searchView.getQuery();
    if(!query) return;

    //2) load results
    await model.loadSearchResults(query);

    //3) render results
    resultsView.render(model.searchResultsPerPage());

    //4) render pagination
    paginationView.render(model.state.search);

  } catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage){
  // 1 render new results
  resultsView.render(model.searchResultsPerPage(goToPage));
  // 2 render new pagination btn
  paginationView.render(model.state.search);
}

const controlServings = function(){
  //update servings
  model.updateServings(6);

  //update revipe view
  recipeView.
}

const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults); 
  paginationView.addHandlerPageChange(controlPagination);
}

init();

// ['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipe));