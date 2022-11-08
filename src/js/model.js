import { async } from "regenerator-runtime"
import { sassFalse } from "sass";
import { API_KEY, API_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { getJSON, sendJSON } from "./helpers";

export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  }
};

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    if(state.bookmarks.some(bookmark => bookmark.id === recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch(err) {
    throw err;
  }
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    const {data} = await getJSON(`${API_URL}?search=${query}`);

    state.search.results  = data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      }
    });
    state.search.page = 1;
    console.log(state.search.results)
  } catch(err) {
    throw err;
  }
};

// FAKE DATA
// const DATA = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,232,24,25,26,27,28,29,30,31];
export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
 
  // FAKE DATA
  // state.search.results = DATA;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = ingredient.quantity * newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
   
  // Add bookmark
  state.bookmarks.push(recipe);
  
  // Mark current recipe as bookmarked
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true; 

  persistBookmarks();
};

export const removeBookmark = (id) => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if(id === state.recipe.id) state.recipe.bookmarked = false; 

  persistBookmarks();
};

export const uploadRecipe = async (newRecipe) => {
  try {
    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ingredient => {
      const ingredientArray = ingredient[1].replaceAll(' ', '').split(',');
      if(ingredientArray.length !== 3) 
        throw new Error(
          'Wrong ingredient format. Please add the correct format'
        );

      const [quantity, unit, description] = ingredientArray;

      return {quantity: quantity ? +quantity : null, unit, description};
    });

    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    console.log(data);
    console.log(recipe);
  } catch(err) {
    throw err;
  }
};

const init = () => {
 const storage = localStorage.getItem('bookmarks');
 if(!storage) return;

 state.bookmarks = JSON.parse(storage);
};

init();