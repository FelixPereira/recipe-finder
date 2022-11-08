import { async } from "regenerator-runtime";

class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handle) {
    this._parentElement.addEventListener('submit', (event) => {
      event.preventDefault();

      handle();
    });
  }
};

export default new SearchView();