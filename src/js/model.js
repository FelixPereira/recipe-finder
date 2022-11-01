import { async } from "regenerator-runtime"
import { API_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  }
}

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
  } catch(err) {
    throw err;
  }
};

// FAKE DATA
const DATA = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,232,24,25,26,27,28,29,30];
export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page -1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  // return state.search.results.slice(start, end);
  return DATA.slice(start, end);
}