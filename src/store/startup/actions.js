import * as types from './actionTypes';
import Startup from '../../services/Startup';

export function fetchArticle() {
  console.log("Fetching");
    return async (dispatch, getState) => {
        try {
            const lastArticle = await Startup.getLastArticle();
            dispatch({type: types.LAST_ARTICLE_FETCHED, lastArticle: lastArticle});
        } catch (error) {
            console.error(error);
        }
    };
}
