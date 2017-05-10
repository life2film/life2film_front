import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  FILM_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        filmSlug: action.payload ? action.payload.film.slug : '',
        title: action.payload ? action.payload.film.title : '',
        description: action.payload ? action.payload.film.description : '',
        body: action.payload ? action.payload.film.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.film.tagList : []
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case FILM_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === FILM_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
