import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const initialState = Immutable({
    lastArticle: undefined,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LAST_ARTICLE_FETCHED:
            return state.merge({
                lastArticle: action.lastArticle
            });
        default:
            return state;
    }
}

export function getLastArticleContent(state) {
    return state.startup.lastArticle;
}
