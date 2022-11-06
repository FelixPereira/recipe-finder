import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

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

    // Update results view to mark selected recipe
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    
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

const controlServings = (newServings) => {
  // Update the recipe servings (in the state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  
  recipeView.update(model.state.recipe);

};

const controlAddBookmark = () => {
  // Add/remove bookmarks
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};


const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);


  // // render fake data
  resultsView.render(model.getSearchResultPage(model.state.search.page));
  // // Render the initial paginatin buttons
  paginationView.render(model.state.search);
};

init();
