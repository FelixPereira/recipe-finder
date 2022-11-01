import { async } from "regenerator-runtime";

class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handlerControlerSearch) {
    this.#parentElement.addEventListener('submit', (event) => {
      event.preventDefault();

      handlerControlerSearch();
    });
  }
};

export default new SearchView();