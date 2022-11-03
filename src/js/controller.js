import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';

// if(module.hot) {
//   module.hot.accept();
// };

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
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    
    // Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render the limited number of results
    resultsView.render(model.getSearchResultPage(model.state.search.page));

    // Render the initial paginatin buttons
    paginationView.render(model.state.search);
  } catch(err) {
    console.log(err);
  }
};

const controlPagination = (pageToGo) => {
  resultsView.render(model.getSearchResultPage(pageToGo));
  paginationView.render(model.state.search);
};


const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  // // render fake data
  // resultsView.render(model.getSearchResultPage(model.state.search.page));
  // // Render the initial paginatin buttons
  // paginationView.render(model.state.search);
};

init();
