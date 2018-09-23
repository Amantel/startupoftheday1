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
