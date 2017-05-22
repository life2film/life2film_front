import film from './reducers/film';
import filmList from './reducers/filmList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';

export default combineReducers({
  film,
  filmList,
  auth,
  common,
  editor,
  home,
  profile,
  settings
});
