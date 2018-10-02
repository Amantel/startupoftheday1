import * as types from './actionTypes';
import Startup from '../../services/Startup';

export function fetchArticles() {
    return async (dispatch, getState) => {
        try {
            const articles = await Startup.getArticles();
            dispatch({type: types.ARTICLES_FETCHED, articles});
        } catch (error) {
            console.error(error);
        }
    };
}
export function fetchArticlesFromMemory() {
  return async (dispatch, getState) => {
      try {
        const articles = JSON.parse(localStorage.getItem('startupOfTheDayArticles'));
        dispatch({type: types.ARTICLES_FETCHED_FROM_MEMORY, articles});
      } catch (error) {
          console.error(error);
      }
  };
}

 
export function loadUser() {
  return async (dispatch, getState) => {
      try {
        let user =  JSON.parse(localStorage.getItem('startupOfTheDayUser'))
        if(!user) {
          user = {
            created: new Date(),
            lastVisit: new Date(),
            favorites:[]
          };
          localStorage.setItem('startupOfTheDayUser', JSON.stringify(user));
        } else {
          user.lastVisit = new Date();
          localStorage.setItem('startupOfTheDayUser', JSON.stringify(user));
        }

        dispatch({type: types.USER_LOADED, user});
      } catch (error) {
          console.error(error);
      }
  };

}
