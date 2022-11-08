import View from './view';
import icons from '../../img/icons.svg';


class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandleShowWindow();
    this._addHandleCloseWindow();
    this.addHandlerUpload();
  };

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  };

  _addHandleShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  };

  _addHandleCloseWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  };

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(event) {
      event.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  };

  _generateMarkup() {};
}

export default new AddRecipeView();