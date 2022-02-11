import { combineReducers } from "redux";

import {
  ADD_MOVIES,
  ADD_FAVOURITES,
  REMOVE_FAVOURITES,
  SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../actions";
const initialMoviestate = {
  list: [],
  favourites: [],
  showFavourites: false,
};
export function movies(state = initialMoviestate, action) {
  // if(action.type===ADD_MOVIES){
  //     return {
  //        ...state,
  //        list: action.movies
  //     };
  // }
  // return state;

  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );

      return {
        ...state,
        favourites: filteredArray,
      };

    case SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

const initialSearchstate = {
  result: {},
  showSearchResults: false,
};
export function search(state = initialSearchstate, action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults:false   
       };
    default:
      return state;
  }
}

// const initialRootstate={
//    movies: initialMoviestate,
//    search: initialSearchstate

// }
// export default function rootReducer (state= initialRootstate, action){
//     return {
//         movies:movies(state.movies ,action),
//         search:search(state.search ,action)
//     }
// }

export default combineReducers({
  movies,
  search,
});
