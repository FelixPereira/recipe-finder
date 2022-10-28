import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const message = document.querySelector('.message');


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
    alert(err)
  }
}

const events = ['hashchange', 'load'];
events.forEach(event => window.addEventListener(event, controlRecipe));

///////////////////////////////////////
