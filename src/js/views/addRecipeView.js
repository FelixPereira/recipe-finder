import View from './view';
import icons from 'url:../../img/icons.svg';


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

  _generateMarkup() {
    
  };
}

export default new AddRecipeView();