import {
  FILM_FAVORITED,
  FILM_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FILM_FAVORITED:
    case FILM_UNFAVORITED:
      return {
        ...state,
        films: state.films.map(film => {
          if (film.slug === action.payload.film.slug) {
            return {
              ...film,
              favorited: action.payload.film.favorited,
              favoritesCount: action.payload.film.favoritesCount
            };
          }
          return film;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        films: action.payload.films,
        filmsCount: action.payload.filmsCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        films: action.payload.films,
        filmsCount: action.payload.filmsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      console.log(action);
      return {
        ...state,
        pager: action.pager,
        // tags: action.payload[0].tags,
        films: action.payload[1].films,
        filmsCount: action.payload[1].filmsCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        films: action.payload.films,
        filmsCount: action.payload.filmsCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        films: action.payload[1].films,
        filmsCount: action.payload[1].filmsCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
