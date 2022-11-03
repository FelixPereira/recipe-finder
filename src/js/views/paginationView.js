import View from './view';
import icons from 'url:../../img/icons.svg';


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btnPagination = event.target.closest('.btn--inline');
      if(!btnPagination) return;

      const pageToGo = +btnPagination.dataset.pagetogo;      ;

      handler(pageToGo);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const currentPage = this._data.page;

    // Page 1, and there are other pages
    if(currentPage === 1 && numberOfPages > 1) {
      return `
        <button data-pagetogo="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    };

    // Last page
    if(currentPage === numberOfPages && numberOfPages > 1) {
      return `
        <button data-pagetogo="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${numberOfPages - 1}</span>
        </button>
      `;
    }

    // Other page 
    if(currentPage > 1 && currentPage < numberOfPages) {
      return `
        <button data-pageToGo="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-pageToGo="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, and there are no other pages
      return '';
  }
}

export default new PaginationView();