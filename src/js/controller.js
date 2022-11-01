import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////////////

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    
    // Loading recipe 
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    console.log(err.status);
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();
    await model.loadSearchResults(query);

  } catch(err) {
    console.log(err);
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
